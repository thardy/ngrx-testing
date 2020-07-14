import {createAction, props} from '@ngrx/store';
import {Product2} from '../product2.model';
import {Update} from '@ngrx/entity';

export const loadProducts = createAction('[Products Resolver] Load Products');
export const productsLoaded = createAction('[loadProducts Effect] Products Loaded', props<{products: Product2[]}>());
export const newProductSaved = createAction('[Edit Product] New Product Saved', props<{product: Product2}>());
export const productCreated = createAction('[newProductSaved Effect] Product Created', props<{product: Product2}>());
// todo: consider getting rid of existingProductSaved since optimistic updates mean we don't need to wait for the api to finish before updating the store
export const existingProductSaved = createAction('[Edit Product] Existing Product Saved', props<{update: Update<Product2>}>());
// export const productUpdated = createAction('[existingProductSaved Effect] Product Updated', props<{product: Product2}>());
export const deleteProduct = createAction('[Products List] Delete Product', props<{product: Product2}>());
export const productDeleted = createAction('[deleteProduct Effect] Product Deleted', props<{product: Product2}>());
