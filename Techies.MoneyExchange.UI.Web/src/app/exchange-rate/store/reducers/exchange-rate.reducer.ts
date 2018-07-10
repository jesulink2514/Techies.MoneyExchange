import * as fromActions from '../actions';
import { ExchangeRateState } from '.';



export const initialState: ExchangeRateState = {
    baseSymbol: '',
    targetSymbol: '',
    amount: 0,
    loaded: false,
    loading: false,
    rate: null
};

export function reducer(state: ExchangeRateState = initialState, action: fromActions.ExchangeAction) {
    switch (action.type) {
        case fromActions.SET_AMOUNT: {
            let amount = action.payload;
            if (amount) { amount = parseFloat(amount.toFixed(4)); }
            return {...state, amount};
        }
        case fromActions.SET_BASE_SYMBOL: {
            const target = state.targetSymbol === action.payload ? null : state.targetSymbol;
            return {
                ...state,
                baseSymbol: action.payload,
                targetSymbol : target,
                rate: null
            };
        }

        case fromActions.SET_TARGET_SYMBOL: {
            const base = state.baseSymbol === action.payload ? null : state.baseSymbol;
            return {
                ...state,
                baseSymbol: base,
                targetSymbol : action.payload,
                rate: null
            };
        }

        case fromActions.LOAD_RATE: {
            return { ...state, loading: true};
        }
        case fromActions.LOAD_RATE_FAIL: {
            return { ...state, loading: false, loaded: false};
        }

        case fromActions.LOAD_RATE_SUCCESS: {
            const rate = action.payload.rates[state.targetSymbol];
            return {...state, rate};
        }

        case fromActions.SWITCH_CURRENCIES: {
            const targetSymbol = state.baseSymbol;
            const baseSymbol = state.targetSymbol;
            return {...state, targetSymbol, baseSymbol};
        }

    }
    return state;
}
