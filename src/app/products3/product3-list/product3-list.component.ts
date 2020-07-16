import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product3} from '../product3.model';
import {Observable} from 'rxjs';
import {Product3Service} from '../product3.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'my-product3-list',
  templateUrl: './product3-list.component.html',
  styleUrls: ['./product3-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Product3ListComponent implements OnInit {

  products$: Observable<Product3[]>;
  productsUnderTen$: Observable<Product3[]>;
  editing = false;
  adding = false;
  selectedProduct: Product3;

  constructor(private product3Service: Product3Service) { }

  ngOnInit(): void {
    this.products$ = this.product3Service.entities$;

    this.productsUnderTen$ = this.product3Service.entities$
      .pipe(
        map(products => products.filter(product => product.price < 10.00))
      );

    // If we need to combine data from two different entities in our store into one observable, here is how we could do it...
    // const productId = this.route.snapshot.paramMap.get('productId');
    // this.product$ = this.product3Service.entities$
    //   .pipe(
    //     map(products => products.find(product => product.id === productId))
    //   );
    //
    // this.associatedItems$ = this.associatedItemService.entities$
    //   .pipe(
    //     withLatestFrom(this.product$),
    //     tap(([associatedItems, product]) => {
    //       if (this.nextPage === 0) {
    //         this.loadAssociatedItemsPage(product);
    //       }
    //     }),
    //     map(([associatedItems, product]) => associatedItems.filter(associatedItem => associatedItem.productId === product.id))
    //   );
    // this.itemsLoading$ = this.associatedItemsService.loading$;
  }

  // loadAssociatedItemsPage(product: Product3) {
  //   this.associatedItemsPage.getWithQuery({
  //     'productId': product.id.toString(),
  //     'pageNumber': this.nextPage.toString(),
  //     'pageSize': this.pageSize.toString()
  //   });
  //   this.nextPage += 1;
  // }

  onEdit(product: Product3) {
    this.selectedProduct = {...product};
    this.editing = true;
  }

  onAdd() {
    this.adding = true;
  }

  onDelete(product: Product3) {
    this.product3Service.delete(product);
  }

  onFormClosed() {
    this.selectedProduct = undefined;
    this.editing = false;
    this.adding = false;
  }
}
