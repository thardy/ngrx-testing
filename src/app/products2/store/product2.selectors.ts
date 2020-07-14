import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Product2State, products2FeatureKey} from './product2.reducers';
import {selectProductState} from '../../products/store/product.selectors';
import * as fromProducts2 from './product2.reducers';

export const selectProduct2State = createFeatureSelector<Product2State>(products2FeatureKey);

export const selectAllProducts = createSelector(
  selectProduct2State,
  fromProducts2.selectAll
);

export const underTenDollars = createSelector(
  selectAllProducts,
  products => products.filter(product => product.price <= 10.00)
);

export const isLoading = createSelector(
  selectProduct2State,
  state => state.loading
);

export const isLoaded = createSelector(
  selectProduct2State,
  state => state.loaded
);
