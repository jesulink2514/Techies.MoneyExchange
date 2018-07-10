"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngrx/store");
var reducers_1 = require("../reducers");
exports.getExchangeRate = store_1.createSelector(reducers_1.getExchangeRateState, function (state) { return state.rate; });
exports.getBaseSymbol = store_1.createSelector(reducers_1.getExchangeRateState, function (state) { return state.baseSymbol; });
exports.getTargetSymbol = store_1.createSelector(reducers_1.getExchangeRateState, function (state) { return state.targetSymbol; });
exports.getExchangeRateLoading = store_1.createSelector(reducers_1.getExchangeRateState, function (state) { return state.loading; });
exports.getExchangeRateLoaded = store_1.createSelector(reducers_1.getExchangeRateState, function (state) { return state.loaded; });
exports.getConvertedAmount = store_1.createSelector(reducers_1.getExchangeRateState, function (state) {
    return state.amount * (state.rate || 0);
});
//# sourceMappingURL=exchange-rate.selector.js.map