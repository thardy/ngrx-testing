import {createFeatureSelector, createSelector} from '@ngrx/store';
import {productsFeatureKey, ProductState} from './product.reducers';

export const selectProductState = createFeatureSelector<ProductState>(productsFeatureKey);

export const selectProductList = createSelector(
  selectProductState,
  (state) => state.products

);

export const isLoaded = createSelector(
  selectProductState,
  state => state.loaded
);
