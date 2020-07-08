import {Injectable} from '@angular/core';
import {ProductService} from '../product.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductActions} from './product.actions-typed';
import {concatMap, map} from 'rxjs/operators';
import {Product} from '../product.model';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.loadProducts),
        concatMap(action => this.productService.getProducts()),
        map((products) => ProductActions.productsLoaded({products}))
      )
  );

  newProductSaved$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.newProductSaved),
        concatMap(action => this.productService.createProduct(action.product)),
        map((product) => ProductActions.productCreated({product: product}))
      ),
  );

  existingProductSaved$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.existingProductSaved),
        concatMap(action => this.productService.updateProduct(action.product)),
        map((product) => ProductActions.productUpdated({product: product}))
      ),
    //{dispatch: false} // this would cause the effect to not dispatch a new action (which is the default)
  );

  deleteProduct$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.deleteProduct),
        concatMap(action => {
          return this.productService.deleteProduct(action.product);
        }),
        map((product) => ProductActions.productDeleted({product: product}))
      )
  );

  constructor(private actions$: Actions,
              private productService: ProductService) {}
}
