import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState} from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProductList = createSelector(
  selectProductState,
  (state) => state.products

);
