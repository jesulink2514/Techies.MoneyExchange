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
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var operators_1 = require("rxjs/operators");
var fromActions = require("../actions/exchange-rate.action");
var fromSelectors = require("../reducers");
var exchange_rate_service_1 = require("../../exchange-rate.service");
var ExchangeRateEffect = /** @class */ (function () {
    function ExchangeRateEffect(actions$, exchangeService, store) {
        var _this = this;
        this.actions$ = actions$;
        this.exchangeService = exchangeService;
        this.store = store;
        this.state = this.store.select(fromSelectors.getExchangeRateState);
        this.loadExchangeRate$ = this.actions$.ofType(fromActions.LOAD_RATE)
            .pipe(operators_1.withLatestFrom(this.state))
            .pipe(operators_1.filter(function (_a) {
            var action = _a[0], state = _a[1];
            return state.baseSymbol && state.targetSymbol && state.baseSymbol !== state.targetSymbol;
        })).pipe(operators_1.switchMap(function (_a) {
            var action = _a[0], storeState = _a[1];
            var state = storeState;
            return _this.exchangeService.getExchangeRate(state.baseSymbol, state.targetSymbol)
                .pipe(operators_1.map(function (rate) { return new fromActions.LoadRateSuccess(rate); }));
        }));
        this.changeSymbol$ = this.actions$.ofType(fromActions.SET_BASE_SYMBOL, fromActions.SET_TARGET_SYMBOL)
            .pipe(operators_1.withLatestFrom(this.state))
            .pipe(operators_1.filter(function (_a) {
            var action = _a[0], state = _a[1];
            return state.baseSymbol && state.targetSymbol && state.baseSymbol !== state.targetSymbol;
        }))
            .pipe(operators_1.map(function (_a) {
            var action = _a[0], storeState = _a[1];
            return new fromActions.LoadRate();
        }));
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Object)
    ], ExchangeRateEffect.prototype, "loadExchangeRate$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Object)
    ], ExchangeRateEffect.prototype, "changeSymbol$", void 0);
    ExchangeRateEffect = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            exchange_rate_service_1.ExchangeRateService,
            store_1.Store])
    ], ExchangeRateEffect);
    return ExchangeRateEffect;
}());
exports.ExchangeRateEffect = ExchangeRateEffect;
//# sourceMappingURL=exchange-rate.effect.js.map