import {createAction, props} from '@ngrx/store';
import {Product} from '../product.model';

export const loadProducts = createAction('[Products List] Load Products');
export const productsLoaded = createAction('[loadProducts Effect] Products Loaded', props<{products: Product[]}>());
export const newProductSaved = createAction('[Edit Product] New Product Saved', props<{product: Product}>());
export const existingProductSaved = createAction('[Edit Product] Existing Product Saved', props<{product: Product}>());
export const productCreated = createAction('[newProductSaved Effect] Product Created', props<{product: Product}>());
export const productUpdated = createAction('[existingProductSaved Effect] Product Updated', props<{product: Product}>());
export const deleteProduct = createAction('[Products List] Delete Product', props<{product: Product}>());
export const productDeleted = createAction('[deleteProduct Effect] Product Deleted', props<{product: Product}>());
