import {Injectable} from '@angular/core';
import {Product3} from './product3.model';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

@Injectable()
export class Product3Service extends EntityCollectionServiceBase<Product3> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product3', serviceElementsFactory);
  }

}
