import { NgModule, inject } from "@angular/core";
import { Route, Router, RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AssetsLink, ROUTE, SharedModule } from 'tt-library-angular-porfolio';
import { managementActiveGuard } from "./guards";
import { UserService } from "./services/user.service";
import { loadRemoteModule } from "@angular-architects/module-federation";
import { LogOutComponent, LoginComponent } from "./components";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

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
  providers: [UserService]
})
export class AppModule {}
