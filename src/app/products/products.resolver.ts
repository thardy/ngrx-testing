import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {ProductActions} from './store/product.actions-typed';
import {isLoaded} from './store/product.selectors';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(isLoaded),
        tap((isLoaded) => {
          if (!this.loading && !isLoaded) {
            this.loading = true;
            this.store.dispatch(ProductActions.loadProducts());
          }
        }),
        filter(isLoaded => isLoaded),
        first(),
        finalize(() => this.loading = false),
      );
  }
}
