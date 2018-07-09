import { createSelector } from '@ngrx/store';
import { getCurrencyState } from '../reducers';

export const getCurrencies = createSelector(getCurrencyState, state => state.currencies);
export const getCurrenciesLoading = createSelector(getCurrencyState, state => state.loading);
export const getCurrenciesLoaded = createSelector(getCurrencyState, state => state.loaded);

