import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProducts2 from './store/product2.reducer';
import {Products2RoutingModule} from './products2-routing.module';
import {Product2ListComponent} from './product2-list/product2-list.component';
import {Product2DetailComponent} from '../products2/product2-detail/product2-detail.component';
import {EditProduct2Component} from '../products2/edit-product2/edit-product2.component';
import {ProductsRoutingModule} from '../products/products-routing.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    Product2ListComponent,
    Product2DetailComponent,
    EditProduct2Component
  ],
  exports: [
    Product2ListComponent,
    Product2DetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromProducts2.products2FeatureKey, fromProducts2.reducer, { metaReducers: fromProducts2.metaReducers })
  ]
})
export class Products2Module { }
