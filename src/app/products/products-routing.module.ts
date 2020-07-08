import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductListComponent} from './product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    // resolve: {
    //   courses: CoursesResolver
    // }
  },
  {
    path: ':productId',
    component: ProductDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
