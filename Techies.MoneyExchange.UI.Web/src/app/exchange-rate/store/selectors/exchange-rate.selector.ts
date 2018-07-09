import { createSelector } from '@ngrx/store';
import { getExchangeRateState } from '../reducers';

export const getExchangeRate = createSelector(getExchangeRateState, state => state.rate);
export const getExchangeRateLoading = createSelector(getExchangeRateState, state => state.loading);
export const getExchangeRateLoaded = createSelector(getExchangeRateState, state => state.loaded);

export const getConvertedAmount = createSelector(getExchangeRateState, state =>
    state.amount * (state.rate || 0));