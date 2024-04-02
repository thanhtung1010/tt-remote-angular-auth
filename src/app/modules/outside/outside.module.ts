import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideComponent } from './outside.component';
import { ROUTE } from 'tt-library-angular-porfolio';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LogOutComponent } from './components/log-out/log-out.component';
import { SharedModule, AssetsLink } from 'tt-library-angular-porfolio';

const routes: Route[] = [
  {
    path: '',
    component: OutsideComponent,
    children: [
      {
        path: ROUTE.OUTSIDE_MANAGEMENT_LOGIN,
        component: LoginComponent,
      },
      {
        path: ROUTE.OUTSIDE_MANAGEMENT_LOGOUT,
        component: LogOutComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ROUTE.OUTSIDE_MANAGEMENT_LOGIN,
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SharedModule,

    AssetsLink,

    NzInputModule,
    NzFormModule,
    NzGridModule,
    NzButtonModule,
  ],
  declarations: [
    OutsideComponent,
    LoginComponent,
    LogOutComponent,
  ]
})
export class OutsideModule { }
