import {createReducer, on, State} from '@ngrx/store';
import {Product} from '../product.model';
import {ProductActions} from './product.actions-typed';
import * as _ from 'lodash';

export const productsFeatureKey = 'products';

export interface ProductState {
  products: Product[],
  loading: boolean,
  loaded: boolean
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  loaded: false
};

export const reducer = createReducer(
  initialState,

  on(ProductActions.loadProducts,
    (state, action) => {
      return {
        ...state,
        loading: true,
      }
    }),

  on(ProductActions.productsLoaded,
    (state, action) => {
      return {
        ...state,
        products: action.products,
        loading: false,
        loaded: true
      }
    }),

  on(ProductActions.productCreated,
    (state, action) => {
      return {
        ...state,
        products: [...state.products, action.product],
      }
    }),

  // we are taking an optimistic approach to UX updates - changing the UX before the back-end completes the update
  //  if we didn't want to be optimistic, we could subscribe to ProductActions.productUpdated instead
  on(ProductActions.existingProductSaved,
    (state, action) => {
      const products = [...state.products];
      let foundIndex = state.products.findIndex((product) => product.id === action.product.id)
      products[foundIndex] = {...action.product};
      return {
        ...state,
        products,
      }
    }),

  on(ProductActions.deleteProduct,
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
