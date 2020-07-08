import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Product2State} from './product2.reducer';

export const selectProductState = createFeatureSelector<Product2State>('products');

export const selectProductList = createSelector(
  selectProductState,
  (state) => state.products

);
