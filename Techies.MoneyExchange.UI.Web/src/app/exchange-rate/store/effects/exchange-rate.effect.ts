import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { switchMap, withLatestFrom, map, filter } from 'rxjs/operators';

import * as fromActions from '../actions/exchange-rate.action';
import * as fromSelectors from '../reducers';
import { ExchangeRateService } from '../../exchange-rate.service';
import { ExchangeRateState } from '../reducers';

@Injectable()
export class ExchangeRateEffect {

    constructor(private actions$: Actions,
        private exchangeService: ExchangeRateService,
        private store: Store<ExchangeRateState>) {}

    state = this.store.select(fromSelectors.getExchangeRateState);

    @Effect()
    loadExchangeRate$ = this.actions$.ofType(fromActions.LOAD_RATE)
        .pipe(withLatestFrom(this.state))
        .pipe(filter(([action, state]) => {
            return state.baseSymbol && state.targetSymbol && state.baseSymbol !== state.targetSymbol;
        })).pipe(switchMap(([action, storeState]) => {
            const state = <ExchangeRateState>storeState;
            return this.exchangeService.getExchangeRate(state.baseSymbol, state.targetSymbol)
                .pipe(map(rate => new fromActions.LoadRateSuccess(rate)));
        }));

    @Effect()
    changeSymbol$ = this.actions$.ofType(fromActions.SET_BASE_SYMBOL, fromActions.SET_TARGET_SYMBOL)
        .pipe(withLatestFrom(this.state))
        .pipe(filter(([action, state]) => {
            return state.baseSymbol && state.targetSymbol && state.baseSymbol !== state.targetSymbol;
        }), map(([action, storeState]) => {
            return new fromActions.LoadRate();
        }));
}
