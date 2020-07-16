import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Product3DetailComponent} from './product3-detail/product3-detail.component';
import {Product3ListComponent} from './product3-list/product3-list.component';
import {Products3Resolver} from './products3.resolver';

export const routes: Routes = [
  {
    path: '',
    component: Product3ListComponent,
    resolve: {
      products: Products3Resolver
    }
  },
  {
    path: ':productId',
    component: Product3DetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Products3RoutingModule { }
