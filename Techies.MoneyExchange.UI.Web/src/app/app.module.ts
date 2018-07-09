import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { API_BASE_URL } from './shared/constants';
import { SharedModule } from './shared/shared.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';


import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate/exchange-rate.component';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'rates' },
      {
        path: 'rates', component: MainLayoutComponent, children: [
          { path: '', component: ExchangeRateComponent }
        ]
      }
    ]),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    ExchangeRateModule
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl }
  ],
  bootstrap: [AppComponent];
})
export class AppModule { }
