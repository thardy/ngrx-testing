import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product2} from './product2.model';
import {Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {Update} from '@ngrx/entity';

@Injectable()
export class Product2Service {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/products/';
  }

  getProducts() {
    return this.http.get<Product2[]>(this.baseUrl);
  }

  createProduct(product: Product2): Observable<Product2> {
    return this.http.post<Product2>(this.baseUrl, product);
  }

  updateProduct(id, update: Partial<Product2>): Observable<Product2> {
    return this.http.put<Product2>(this.baseUrl + id, update);
  }

  deleteProduct(product: Product2) {
    return this.http.delete(this.baseUrl + product.id)
      .pipe(
        map((result) => {
          return product;
        })
      );
  }
}
