import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product.model';
import {Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ProductService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/products/';
  }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + product.id, product);
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.baseUrl + product.id)
      .pipe(
        map((result) => {
          return product;
        })
      );
  }
}
