import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InsideComponent } from './inside.component';

const _routes: Route[] = [
  {
    path: '',
    component: InsideComponent,
    children: [],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(_routes),
  ],
  declarations: [InsideComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class InsideModule { }
