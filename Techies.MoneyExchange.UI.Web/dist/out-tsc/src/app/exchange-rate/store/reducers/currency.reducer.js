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
var fromActions = require("../actions/currency.action");
exports.initialState = {
    currencies: [],
    loaded: false,
    loading: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case fromActions.LOAD_CURRENCIES: {
            return __assign({}, state, { loading: true });
        }
        case fromActions.LOAD_CURRENCIES_SUCCESS: {
            var currencies = action.payload;
            return __assign({}, state, { loading: false, loaded: true, currencies: currencies });
        }
        case fromActions.LOAD_CURRENCIES_FAIL: {
            return __assign({}, state, { loading: false, loaded: false });
        }
    }
    return state;
}
exports.reducer = reducer;
//# sourceMappingURL=currency.reducer.js.map