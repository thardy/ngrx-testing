import {Injectable} from '@angular/core';
import {Product3} from './product3.model';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PluralHttpUrlGenerator} from '../store/plural-http-url-generator';

@Injectable()
export class Products3DataService extends DefaultDataService<Product3> {
  constructor(http: HttpClient, httpUrlGenerator: PluralHttpUrlGenerator) {
    super('Product3', http, httpUrlGenerator);
  }

  // getAll(): Observable<Product3[]> {
  //   return this.http.get('/api/products')
  //     .pipe(
  //       map((result: Product3[]) => {
  //         // this is how we return a custom payload (e.g. if the array is in a property of the result
  //         //  named 'data')
  //         return result['data'];
  //       })
  //     );
  // }
}
