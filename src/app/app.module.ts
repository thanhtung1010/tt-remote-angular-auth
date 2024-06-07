import { NgModule, inject } from "@angular/core";
import { Route, Router, RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ROUTE, SharedModule } from 'tt-library-angular-porfolio';
import { managementActiveGuard } from "./guards";
import { UserService } from "./services/user.service";
import { loadRemoteModule } from "@angular-architects/module-federation";

const routes: Route[] = [
  {
    path: '',
    component: AppComponent,
    canActivate: [managementActiveGuard],
    children: [
      {
        path: ROUTE.OUTSIDE_MANAGEMENT,
        loadChildren: () => import('./modules/outside/outside.module').then((e) => e.OutsideModule),
      },
      {
        path: ROUTE.INSIDE_MANAGEMENT,
        loadChildren: () => loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:8083/remoteEntry.js',
          exposedModule: './module'
        })
        .then(m => m.AppModule)
        .catch(error => inject(Router).navigate([ROUTE.NOT_FOUND])),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ROUTE.OUTSIDE_MANAGEMENT,
      },
    ]
  }
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [AppComponent],
  providers: [UserService]
})
export class AppModule {}
