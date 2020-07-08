import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../product.model';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';
import {ProductActions} from '../store/product.actions-typed';

@Component({
  selector: 'my-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {
  @Input() product: Product;
  @Input() mode: 'create' | 'update';
  @Output() formClosed = new EventEmitter();
  form: FormGroup;
  dialogTitle: string;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    const formControls = {
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    };

    if (this.mode === 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...this.product});
    }
    else if (this.mode === 'create') {
      this.form = this.fb.group({
        ...formControls
      });
    }
  }

  onCancel() {
    this.formClosed.emit();
  }

  onSave() {
    const product: Product = {
      ...this.product,
      ...this.form.value
    };

    if (this.mode === 'create') {
      this.store.dispatch(ProductActions.newProductSaved({product}));
    }
    else if (this.mode === 'update') {
      this.store.dispatch(ProductActions.existingProductSaved({product}));
    }

    this.formClosed.emit();
  }

}
