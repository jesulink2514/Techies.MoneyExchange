import * as fromActions from '../actions/currency.action';
import { CurrencyState } from '.';

export const initialState: CurrencyState = {
    currencies: [],
    loaded: false,
    loading: false
};

export function reducer(state: CurrencyState = initialState, action: fromActions.CurrencyAction) {

    switch (action.type) {
        case fromActions.LOAD_CURRENCIES: {
            return { ...state , loading: true};
        }

        case fromActions.LOAD_CURRENCIES_SUCCESS: {
            const currencies = action.payload;
            return { ...state , loading: false, loaded: true, currencies};
        }

        case fromActions.LOAD_CURRENCIES_FAIL: {
            return { ...state , loading: false , loaded: false};
        }
    }

    return state;
}
