import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ROUTE, SharedModule } from 'tt-library-angular-porfolio';

const routes: Route[] = [
  {
    path: ROUTE.OUTSIDE_MANAGEMENT,
    loadChildren: () => import('./modules/outside/outside.module').then((e) => e.OutsideModule),
  },
  {
    path: ROUTE.INSIDE_MANAGEMENT,
    loadChildren: () => import('./modules/inside/inside.module').then((e) => e.InsideModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE.OUTSIDE_MANAGEMENT,
  },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [AppComponent]
})
export class AppModule {}
