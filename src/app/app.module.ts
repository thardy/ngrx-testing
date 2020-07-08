import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {Routes} from '@angular/router';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {metaReducers} from './reducers';

// const routes: Routes = [
//   {
//     path: 'products',
//     loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
//     // canActivate: [AuthGuard]
//   },
//   {
//     path: 'products2',
//     loadChildren: () => import('./products2/products2.module').then(m => m.Products2Module),
//     // canActivate: [AuthGuard]
//   },
//   {
//     path: '**',
//     redirectTo: '/'
//   }
// ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
