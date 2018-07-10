"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_BASE_SYMBOL = '[ExchangeRate] Set base symbol';
exports.SET_TARGET_SYMBOL = '[ExchangeRate] Set target symbol';
exports.SET_AMOUNT = '[ExchangeRate] Set amount';
exports.SWITCH_CURRENCIES = '[ExchangeRate] Switch currencies';
exports.LOAD_RATE = '[ExchangeRate] Load rate';
exports.LOAD_RATE_SUCCESS = '[ExchangeRate] Load rate success';
exports.LOAD_RATE_FAIL = '[ExchangeRate] Load rate fail';
var SetAmount = /** @class */ (function () {
    function SetAmount(payload) {
        this.payload = payload;
        this.type = exports.SET_AMOUNT;
    }
    return SetAmount;
}());
exports.SetAmount = SetAmount;
var SetBaseSymbol = /** @class */ (function () {
    function SetBaseSymbol(payload) {
        this.payload = payload;
        this.type = exports.SET_BASE_SYMBOL;
    }
    return SetBaseSymbol;
}());
exports.SetBaseSymbol = SetBaseSymbol;
var SetTargetSymbol = /** @class */ (function () {
    function SetTargetSymbol(payload) {
        this.payload = payload;
        this.type = exports.SET_TARGET_SYMBOL;
    }
    return SetTargetSymbol;
}());
exports.SetTargetSymbol = SetTargetSymbol;
var LoadRate = /** @class */ (function () {
    function LoadRate() {
        this.type = exports.LOAD_RATE;
    }
    return LoadRate;
}());
exports.LoadRate = LoadRate;
var LoadRateSuccess = /** @class */ (function () {
    function LoadRateSuccess(payload) {
        this.payload = payload;
        this.type = exports.LOAD_RATE_SUCCESS;
    }
    return LoadRateSuccess;
}());
exports.LoadRateSuccess = LoadRateSuccess;
var LoadRateFail = /** @class */ (function () {
    function LoadRateFail(payload) {
        this.payload = payload;
        this.type = exports.LOAD_RATE_FAIL;
    }
    return LoadRateFail;
}());
exports.LoadRateFail = LoadRateFail;
var SwitchCurrencies = /** @class */ (function () {
    function SwitchCurrencies() {
        this.type = exports.SWITCH_CURRENCIES;
    }
    return SwitchCurrencies;
}());
exports.SwitchCurrencies = SwitchCurrencies;
//# sourceMappingURL=exchange-rate.action.js.map