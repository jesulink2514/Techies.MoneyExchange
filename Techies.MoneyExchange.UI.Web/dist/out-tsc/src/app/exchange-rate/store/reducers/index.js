"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fromExchange = require("./exchange-rate.reducer");
var fromCurrency = require("./currency.reducer");
var store_1 = require("@ngrx/store");
exports.reducers = {
    exchange: fromExchange.reducer,
    currency: fromCurrency.reducer
};
exports.getFeatureState = store_1.createFeatureSelector('exchange');
exports.getExchangeRateState = store_1.createSelector(exports.getFeatureState, function (state) { return state.exchange; });
exports.getCurrencyState = store_1.createSelector(exports.getFeatureState, function (state) { return state.currency; });
//# sourceMappingURL=index.js.map