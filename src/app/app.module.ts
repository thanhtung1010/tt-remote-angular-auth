import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ROUTE } from 'tt-library-angular-porfolio';
import { AppComponent } from "./app.component";

const routes: Route[] = [
  {
    path: ROUTE.AUTH_LOGIN,
    loadComponent: () => import('./components/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: ROUTE.AUTH_LOGOUT,
    loadComponent: () => import('./components/log-out/log-out.component').then((c) => c.LogOutComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE.AUTH_LOGIN,
  },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [AppComponent],
})
export class AppModule {}
