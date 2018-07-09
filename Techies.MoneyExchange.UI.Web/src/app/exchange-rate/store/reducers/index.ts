import * as fromExchange from './exchange-rate.reducer';
import * as fromCurrency from './currency.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface CurrencyState {
    currencies: string[];
    loaded: boolean;
    loading: boolean;
}

export interface ExchangeRateState {
    baseSymbol: string;
    targetSymbol: string;
    amount: number;
    loaded: boolean;
    loading: boolean;
    rate?: number;
}

export interface ExchangeState {
    exchange: ExchangeRateState;
    currency: CurrencyState;
}

export const reducers: ActionReducerMap<ExchangeState> = {
    exchange : fromExchange.reducer,
    currency: fromCurrency.reducer
};

export const getFeatureState = createFeatureSelector<ExchangeState>(
    'exchange'
);

export const getExchangeRateState = createSelector(getFeatureState, state => state.exchange);
export const getCurrencyState = createSelector(getFeatureState, state => state.currency);
