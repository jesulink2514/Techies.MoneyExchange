import { createSelector } from '@ngrx/store';
import { getExchangeRateState } from '../reducers';

export const getExchangeRate = createSelector(getExchangeRateState, state => state.rate);
export const getBaseSymbol = createSelector(getExchangeRateState, state => state.baseSymbol);
export const getTargetSymbol = createSelector(getExchangeRateState, state => state.targetSymbol);

export const getExchangeRateLoading = createSelector(getExchangeRateState, state => state.loading);
export const getExchangeRateLoaded = createSelector(getExchangeRateState, state => state.loaded);

export const getCurrentAmount = createSelector(getExchangeRateState, state => state.amount);
export const getConvertedAmount = createSelector(getExchangeRateState, state =>
    (state.amount || 0) * (state.rate || 0));
