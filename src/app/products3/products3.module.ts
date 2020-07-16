import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {EntityMetadataMap, EntityDefinitionService, EntityDataService, PLURAL_NAMES_TOKEN, Pluralizer} from '@ngrx/data';
import {Products3RoutingModule} from '../products3/products3-routing.module';
import {Product3ListComponent} from '../products3/product3-list/product3-list.component';
import {Product3DetailComponent} from '../products3/product3-detail/product3-detail.component';
import {EditProduct3Component} from '../products3/edit-product3/edit-product3.component';
import {Products3Resolver} from './products3.resolver';
import {Product3Service} from '../products3/product3.service';
import {Products3DataService} from './products3-data.service';
import {compareProducts3} from './product3.model';

const entityMetadata: EntityMetadataMap = {
  Product3: {
    sortComparer: compareProducts3,
    entityDispatcherOptions: {
      optimisticUpdate: true, // updates are pessimistic by default, so we change it here
      //optimisticDelete: true, // not needed because deletes are optimistic by default
    }
  }
};

const pluralNames = {
  Product3: 'Products3'
}

@NgModule({
  declarations: [
    Product3ListComponent,
    Product3DetailComponent,
    EditProduct3Component
  ],
  exports: [
    Product3ListComponent,
    Product3DetailComponent
  ],
  imports: [
    CommonModule,
    Products3RoutingModule,
    ReactiveFormsModule,
    // StoreModule.forFeature(fromProducts3.products3FeatureKey, fromProducts3.reducer, { metaReducers: fromProducts3.metaReducers }),
    // EffectsModule.forFeature([Product3Effects]),
  ],
  providers: [
    Product3Service,
    Products3Resolver,
    Products3DataService,
    // provide our custom pluralNames for @ngrx/data (this is not working here due to being lazy loaded)
    { provide: PLURAL_NAMES_TOKEN, multi: true, useValue: pluralNames }
  ]
})
export class Products3Module {
  constructor(private eds: EntityDefinitionService,
              private entityDataService: EntityDataService,
              private productDataService: Products3DataService) {
    eds.registerMetadataMap(entityMetadata);

    // this is how to override the default back-end data service of @ngrx/data.  It will now use
    //  our custom data service to handle api calls.  We only need this if we
    //  want to override the conventional behaviors of the default data service.
    //entityDataService.registerService('Product3', productDataService);
  }
}
