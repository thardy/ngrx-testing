import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product2} from '../product2.model';
import {Observable} from 'rxjs';
import {isLoading, selectAllProducts} from '../store/product2.selectors';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {Product2Actions} from '../store/product2.actions-typed';

@Component({
  selector: 'my-product2-list',
  templateUrl: './product2-list.component.html',
  styleUrls: ['./product2-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Product2ListComponent implements OnInit {

  products$: Observable<Product2[]>;
  loading$: Observable<boolean>;
  editing = false;
  adding = false;
  selectedProduct: Product2;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.store
      .pipe(
        select(selectAllProducts)
      );

    this.loading$ = this.store
      .pipe(select(isLoading))
  }

  onEdit(product: Product2) {
    this.selectedProduct = {...product};
    this.editing = true;
  }

  onAdd() {
    this.adding = true;
  }

  onDelete(product: Product2) {
    this.store.dispatch(Product2Actions.deleteProduct({product: product}));
  }

  onFormClosed() {
    this.selectedProduct = undefined;
    this.editing = false;
    this.adding = false;
  }
}
