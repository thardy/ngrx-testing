import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'my-product3-detail',
  templateUrl: './product3-detail.component.html',
  styleUrls: ['./product3-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Product3DetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
