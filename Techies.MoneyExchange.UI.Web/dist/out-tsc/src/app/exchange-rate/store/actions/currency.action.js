"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOAD_CURRENCIES = '[ExchangeRate] Load currencies';
exports.LOAD_CURRENCIES_FAIL = '[ExchangeRate] Load currencies fail';
exports.LOAD_CURRENCIES_SUCCESS = '[ExchangeRate] Load currencies success';
var LoadCurrencies = /** @class */ (function () {
    function LoadCurrencies() {
        this.type = exports.LOAD_CURRENCIES;
    }
    return LoadCurrencies;
}());
exports.LoadCurrencies = LoadCurrencies;
var LoadCurrenciesSuccess = /** @class */ (function () {
    function LoadCurrenciesSuccess(payload) {
        this.payload = payload;
        this.type = exports.LOAD_CURRENCIES_SUCCESS;
    }
    return LoadCurrenciesSuccess;
}());
exports.LoadCurrenciesSuccess = LoadCurrenciesSuccess;
var LoadCurrenciesFail = /** @class */ (function () {
    function LoadCurrenciesFail(payload) {
        this.payload = payload;
        this.type = exports.LOAD_CURRENCIES_FAIL;
    }
    return LoadCurrenciesFail;
}());
exports.LoadCurrenciesFail = LoadCurrenciesFail;
//# sourceMappingURL=currency.action.js.map