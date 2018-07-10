"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngrx/store");
var reducers_1 = require("../reducers");
exports.getCurrencies = store_1.createSelector(reducers_1.getCurrencyState, function (state) { return state.currencies; });
exports.getCurrenciesLoading = store_1.createSelector(reducers_1.getCurrencyState, function (state) { return state.loading; });
exports.getCurrenciesLoaded = store_1.createSelector(reducers_1.getCurrencyState, function (state) { return state.loaded; });
//# sourceMappingURL=currency.selector.js.map