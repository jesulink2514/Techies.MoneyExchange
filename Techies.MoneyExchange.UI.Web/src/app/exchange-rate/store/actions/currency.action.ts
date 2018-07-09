import { Action } from '@ngrx/store';

export const LOAD_CURRENCIES = '[ExchangeRate] Load currencies';
export const LOAD_CURRENCIES_FAIL = '[ExchangeRate] Load currencies fail';
export const LOAD_CURRENCIES_SUCCESS = '[ExchangeRate] Load currencies success';

export class LoadCurrencies implements Action {
    readonly type = LOAD_CURRENCIES;
}

export class LoadCurrenciesSuccess implements Action {
    readonly type = LOAD_CURRENCIES_SUCCESS;
    constructor(public payload: string[]) {}
}

export class LoadCurrenciesFail implements Action {
    readonly type = LOAD_CURRENCIES_FAIL;
    constructor(public payload: any) {}
}

export type CurrencyAction =
| LoadCurrencies
| LoadCurrenciesSuccess
| LoadCurrenciesFail;
