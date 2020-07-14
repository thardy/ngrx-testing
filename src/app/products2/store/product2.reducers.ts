import {createReducer, MetaReducer, on, State} from '@ngrx/store';
import {compareProducts2, Product2} from '../product2.model';
import {Product2Actions} from './product2.actions-typed';
import * as _ from 'lodash';
import {environment} from '../../../environments/environment';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export const products2FeatureKey = 'products2';

export interface Product2State extends EntityState<Product2> {
  loading: boolean,
  loaded: boolean
}

export const adapter = createEntityAdapter<Product2>({
  sortComparer: compareProducts2,
  // selectId: product => product.productId // this is where you would override id if it is not 'id'
});

export const initialState: Product2State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(Product2Actions.loadProducts,
    (state, action) => {
      return {
        ...state,
        loading: true,
      }
    }),

  on(Product2Actions.productsLoaded,
    (state, action) => {
      return adapter.setAll(
        action.products,
        {...state, loading: false, loaded: true});
    }),

  on(Product2Actions.productCreated,
    (state, action) => {
      return adapter.addOne(action.product, state);
    }),

  // we are taking an optimistic approach to UX updates - changing the UX before the back-end completes the update
  //  if we didn't want to be optimistic, we could have a ProductActions.productUpdated and subscribe to that instead
  on(Product2Actions.existingProductSaved,
    (state, action) => {
      return adapter.updateOne(action.update, state);
    }),

  on(Product2Actions.deleteProduct,
    (state, action) => {
      return adapter.removeOne(action.product.id, state);
    }),

);

export const {
  selectAll
} = adapter.getSelectors();

export const metaReducers: MetaReducer<Product2State>[] = !environment.production ? [] : [];
