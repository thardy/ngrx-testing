import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'my-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
