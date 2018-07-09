"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_BASE_SYMBOL = '[ExchangeRate] Set base symbol';
exports.SET_TARGET_SYMBOL = '[ExchangeRate] Set target symbol';
exports.LOAD_RATE = '[ExchangeRate] Load rate';
exports.LOAD_RATE_SUCCESS = '[ExchangeRate] Load rate success';
exports.LOAD_RATE_FAIL = '[ExchangeRate] Load rate fail';
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
    function LoadRate(payload) {
        this.payload = payload;
        this.type = exports.LOAD_RATE;
    }
    return LoadRate;
}());
exports.LoadRate = LoadRate;
//# sourceMappingURL=exchange-rate.action.js.map