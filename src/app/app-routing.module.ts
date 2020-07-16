import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {productsFeatureKey} from './products/store/product.reducers';
import {products2FeatureKey} from './products2/store/product2.reducers';


const routes: Routes = [
  {
    path: productsFeatureKey,
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    // canActivate: [AuthGuard]
  },
  {
    path: products2FeatureKey,
    loadChildren: () => import('./products2/products2.module').then(m => m.Products2Module),
    // canActivate: [AuthGuard]
  },
  {
    path: 'products3',
    loadChildren: () => import('./products3/products3.module').then(m => m.Products3Module),
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
