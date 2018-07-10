import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { ExchangeRateService } from './exchange-rate.service';

import { reducers, effects } from './store';
import { ExchangeRateFormComponent } from './exchange-rate-form/exchange-rate-form.component';
import { ExchangeResultComponent } from './exchange-result/exchange-result.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('exchange', reducers),
    EffectsModule.forFeature(effects),
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [
    ExchangeRateComponent
  ],
  declarations: [ExchangeRateComponent, ExchangeRateFormComponent, ExchangeResultComponent],
  providers: [
    ExchangeRateService
  ]
})
export class ExchangeRateModule { }
