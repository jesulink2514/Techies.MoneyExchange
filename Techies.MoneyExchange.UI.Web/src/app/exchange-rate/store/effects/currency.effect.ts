import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import * as fromCurrencies from '../actions/currency.action';
import { ExchangeRateService } from '../../exchange-rate.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CurrencyEffect {

    constructor(private actions: Actions, private exchangeService: ExchangeRateService) {}

    @Effect()
    loadCurrencies$ = this.actions.ofType(fromCurrencies.LOAD_CURRENCIES)
        .pipe(switchMap(_ => {
            return this.exchangeService.getAvailableCurrencies()
                .pipe(map(r => new fromCurrencies.LoadCurrenciesSuccess(r)));
        }));

}
