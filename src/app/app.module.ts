import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {EntityDataModule, HttpUrlGenerator, PLURAL_NAMES_TOKEN, Pluralizer} from '@ngrx/data';
import {HttpClientModule} from '@angular/common/http';
import {Routes} from '@angular/router';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {metaReducers, reducers} from './store/reducers';
import {PluralHttpUrlGenerator} from './store/plural-http-url-generator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      }
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
  ],
  providers: [
    PluralHttpUrlGenerator,
    // this is needed to cause ngrx/data to use all plural resource names (otherwise PUT uses product while GET uses products - go figure)
    { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator },
    // todo: move this out of the root module and into the feature module as soon as I figure out how to map plural names from a lazy-loaded module
    { provide: PLURAL_NAMES_TOKEN, multi: true, useValue: {
        Product3: 'Products3'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
