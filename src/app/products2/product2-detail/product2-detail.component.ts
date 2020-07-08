import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'my-product2-detail',
  templateUrl: './product2-detail.component.html',
  styleUrls: ['./product2-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Product2DetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
