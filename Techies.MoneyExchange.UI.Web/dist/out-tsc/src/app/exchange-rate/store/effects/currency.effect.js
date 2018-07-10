"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var fromCurrencies = require("../actions/currency.action");
var exchange_rate_service_1 = require("../../exchange-rate.service");
var operators_1 = require("rxjs/operators");
var CurrencyEffect = /** @class */ (function () {
    function CurrencyEffect(actions, exchangeService) {
        var _this = this;
        this.actions = actions;
        this.exchangeService = exchangeService;
        this.loadCurrencies$ = this.actions.ofType(fromCurrencies.LOAD_CURRENCIES)
            .pipe(operators_1.switchMap(function (_) {
            return _this.exchangeService.getAvailableCurrencies()
                .pipe(operators_1.map(function (r) { return new fromCurrencies.LoadCurrenciesSuccess(r); }));
        }));
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Object)
    ], CurrencyEffect.prototype, "loadCurrencies$", void 0);
    CurrencyEffect = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, exchange_rate_service_1.ExchangeRateService])
    ], CurrencyEffect);
    return CurrencyEffect;
}());
exports.CurrencyEffect = CurrencyEffect;
//# sourceMappingURL=currency.effect.js.map