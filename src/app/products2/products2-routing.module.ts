import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Product2DetailComponent} from './product2-detail/product2-detail.component';
import {Product2ListComponent} from './product2-list/product2-list.component';
import {Products2Resolver} from './products2.resolver';

export const routes: Routes = [
  {
    path: '',
    component: Product2ListComponent,
    resolve: {
      products: Products2Resolver
    }
  },
  {
    path: ':productId',
    component: Product2DetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Products2RoutingModule { }
