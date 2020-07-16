import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product3} from '../product3.model';
import {Observable} from 'rxjs';
import {AppState} from '../../store/reducers';
import {Store} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Product3Service} from '../product3.service';

@Component({
  selector: 'my-edit-product3',
  templateUrl: './edit-product3.component.html',
  styleUrls: ['./edit-product3.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProduct3Component implements OnInit {
  @Input() product: Product3;
  @Input() mode: 'create' | 'update';
  @Output() formClosed = new EventEmitter();
  form: FormGroup;
  dialogTitle: string;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private product3Service: Product3Service
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
    const product: Product3 = {
      ...this.product,
      ...this.form.value
    };

    if (this.mode === 'update') {
      // - updates the store
      // - makes http PUT call to backend
      // - emits ngrx actions
      this.product3Service.update(product);
      this.formClosed.emit();
    }
    else if (this.mode === 'create') {
      this.product3Service.add(product)
        .subscribe((product) => {
          console.log("New Product", product);
          this.formClosed.emit();
        });
    }

  }

}
