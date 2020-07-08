import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromProducts from './store/product.reducer';
import {StoreModule} from '@ngrx/store';
import { ProductListComponent } from './product-list/product-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductEffects} from './store/product.effects';
import { EffectsModule } from '@ngrx/effects';
import {ProductService} from './product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {ProductsRoutingModule} from './products-routing.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    EditProductComponent
  ],
  exports: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromProducts.productsFeatureKey, fromProducts.reducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
