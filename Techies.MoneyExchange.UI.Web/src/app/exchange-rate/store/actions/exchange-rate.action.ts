import { Action } from '@ngrx/store';
import { ExchangeRate } from '../../exchange-rate';

export const SET_BASE_SYMBOL = '[ExchangeRate] Set base symbol';
export const SET_TARGET_SYMBOL = '[ExchangeRate] Set target symbol';

export const LOAD_RATE = '[ExchangeRate] Load rate';
export const LOAD_RATE_SUCCESS = '[ExchangeRate] Load rate success';
export const LOAD_RATE_FAIL = '[ExchangeRate] Load rate fail';

export class SetBaseSymbol implements Action {
    readonly type = SET_BASE_SYMBOL;
    constructor(public payload: string) {}
}

export class SetTargetSymbol implements Action {
    readonly type = SET_TARGET_SYMBOL;
    constructor(public payload: string) {}
}

export class LoadRate implements Action {
    readonly type = LOAD_RATE;
    constructor() {}
}

export class LoadRateSuccess implements Action {
    readonly type = LOAD_RATE_SUCCESS;
    constructor(public payload:  ExchangeRate) {}
}

export class LoadRateFail implements Action {
    readonly type = LOAD_RATE_FAIL;
    constructor(public payload: any) {}
}

export type ExchangeAction =
| LoadRate
| LoadRateFail
| LoadRateSuccess
| SetBaseSymbol
| SetTargetSymbol;



