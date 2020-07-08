import {createReducer, MetaReducer, on, State} from '@ngrx/store';
import {Product2} from '../product2.model';
import {Product2Actions} from './product2.actions-typed';
import * as _ from 'lodash';
import {environment} from '../../../environments/environment';

export const products2FeatureKey = 'products2';

export interface Product2State {
  products: Product2[],
  loading: boolean,
  loaded: boolean
}

export const initialState: Product2State = {
  products: [],
  loading: false,
  loaded: false
};

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
      return {
        ...state,
        products: action.products,
        loading: false,
        loaded: true
      }
    }),

  on(Product2Actions.productCreated,
    (state, action) => {
      return {
        ...state,
        products: [...state.products, action.product],
      }
    }),

  // we are taking an optimistic approach to UX updates - changing the UX before the back-end completes the update
  //  if we didn't want to be optimistic, we could subscribe to ProductActions.productUpdated instead
  on(Product2Actions.existingProductSaved,
    (state, action) => {
      const products = [...state.products];
      let foundIndex = state.products.findIndex((product) => product.id === action.product.id)
      products[foundIndex] = {...action.product};
      return {
        ...state,
        products,
      }
    }),

  on(Product2Actions.deleteProduct,
    (state, action) => {
      const filteredProducts = state.products.filter((product) => product.id !== action.product.id)
      return {
        ...state,
        products: filteredProducts
      }
    }),

  // on(ProductActions.productUpdated,
  //   (state, action) => {
  //     return {
  //       ...state,
  //       products:
  //     }
  //   }),
);

export const metaReducers: MetaReducer<Product2State>[] = !environment.production ? [] : [];
