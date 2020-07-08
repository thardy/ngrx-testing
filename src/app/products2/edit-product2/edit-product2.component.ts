import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product2} from '../product2.model';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';
import {Product2Actions} from '../store/product2.actions-typed';

@Component({
  selector: 'my-edit-product2',
  templateUrl: './edit-product2.component.html',
  styleUrls: ['./edit-product2.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProduct2Component implements OnInit {
  @Input() product: Product2;
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
    const product: Product2 = {
      ...this.product,
      ...this.form.value
    };

    if (this.mode === 'create') {
      this.store.dispatch(Product2Actions.newProductSaved({product}));
    }
    else if (this.mode === 'update') {
      this.store.dispatch(Product2Actions.existingProductSaved({product}));
    }

    this.formClosed.emit();
  }

}
