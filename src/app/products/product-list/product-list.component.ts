import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {Observable} from 'rxjs';
import {selectProductList} from '../store/product.selectors';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {ProductActions} from '../store/product.actions-typed';

@Component({
  selector: 'my-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>
  editing = false;
  adding = false;
  selectedProduct: Product;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.store
      .pipe(
        select(selectProductList)
      );
  }

  onEdit(product: Product) {
    this.selectedProduct = {...product};
    this.editing = true;
  }

  onAdd() {
    this.adding = true;
  }

  onDelete(product: Product) {
    this.store.dispatch(ProductActions.deleteProduct({product: product}));
  }

  onFormClosed() {
    this.selectedProduct = undefined;
    this.editing = false;
    this.adding = false;
  }
}
