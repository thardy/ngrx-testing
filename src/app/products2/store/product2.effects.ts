import {Injectable} from '@angular/core';
import {Product2Service} from '../product2.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Product2Actions} from './product2.actions-typed';
import {concatMap, map} from 'rxjs/operators';
import {Product2} from '../product2.model';
import {AppState} from '../../store/reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class Product2Effects {
  loadProducts$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(Product2Actions.loadProducts),
        concatMap(action => this.product2Service.getProducts()),
        map((products) => Product2Actions.productsLoaded({products}))
      )
  );

  newProductSaved$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(Product2Actions.newProductSaved),
        concatMap(action => this.product2Service.createProduct(action.product)),
        map((product) => Product2Actions.productCreated({product: product}))
      ),
  );

  existingProductSaved$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(Product2Actions.existingProductSaved),
        concatMap(action => this.product2Service.updateProduct(action.update.id, action.update.changes)),
        map((product) => Product2Actions.productUpdated({product: product}))
      )
  );

  deleteProduct$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(Product2Actions.deleteProduct),
        concatMap(action => {
          return this.product2Service.deleteProduct(action.product);
        }),
        map((product) => Product2Actions.productDeleted({product: product}))
      )
  );

  constructor(private actions$: Actions,
              private product2Service: Product2Service,
              ) {}
}
