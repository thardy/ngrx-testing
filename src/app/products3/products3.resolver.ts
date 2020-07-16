import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, finalize, first, map, tap} from 'rxjs/operators';
import {Product3Service} from './product3.service';

@Injectable()
export class Products3Resolver implements Resolve<boolean> {

  loading = false;

  constructor(private product3Service: Product3Service) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.product3Service.loaded$
      .pipe(
        tap((loaded) => {
          if (!loaded) {
            // EntityCollectionServiceBase will...
            // - trigger ngrx/data actions
            // - call the back-end store (GET api call)
            // - trigger effects
            // - place the results of the api call into the store
            this.product3Service.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
