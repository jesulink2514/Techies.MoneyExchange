"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fromActions = require("../actions");
exports.initialState = {
    baseSymbol: '',
    targetSymbol: '',
    amount: 0,
    loaded: false,
    loading: false,
    rate: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case fromActions.SET_AMOUNT: {
            var amount = action.payload;
            return __assign({}, state, { amount: amount });
        }
        case fromActions.SET_BASE_SYMBOL: {
            var target = state.targetSymbol === action.payload ? null : state.targetSymbol;
            return __assign({}, state, { baseSymbol: action.payload, targetSymbol: target });
        }
        case fromActions.SET_TARGET_SYMBOL: {
            var base = state.baseSymbol === action.payload ? null : state.baseSymbol;
            return __assign({}, state, { baseSymbol: base, targetSymbol: action.payload });
        }
        case fromActions.LOAD_RATE: {
            return __assign({}, state, { loading: true });
        }
        case fromActions.LOAD_RATE_FAIL: {
            return __assign({}, state, { loading: false, loaded: false });
        }
        case fromActions.LOAD_RATE_SUCCESS: {
            var rate = action.payload.rates[state.targetSymbol];
            return __assign({}, state, { rate: rate });
        }
        case fromActions.SWITCH_CURRENCIES: {
            var targetSymbol = state.baseSymbol;
            var baseSymbol = state.targetSymbol;
            return __assign({}, state, { targetSymbol: targetSymbol, baseSymbol: baseSymbol });
        }
    }
    return state;
}
exports.reducer = reducer;
//# sourceMappingURL=exchange-rate.reducer.js.map