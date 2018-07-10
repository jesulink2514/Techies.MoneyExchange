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
var fromActions = require("../store/actions");
var fromSelectors = require("../store/selectors");
var ExchangeRateComponent = /** @class */ (function () {
    function ExchangeRateComponent(store) {
        this.store = store;
    }
    ExchangeRateComponent.prototype.ngOnInit = function () {
        this.rate$ = this.store.select(fromSelectors.getExchangeRate);
        this.currencies$ = this.store.select(fromSelectors.getCurrencies);
        this.base$ = this.store.select(fromSelectors.getBaseSymbol);
        this.target$ = this.store.select(fromSelectors.getTargetSymbol);
        this.convertedAmount$ = this.store.select(fromSelectors.getConvertedAmount);
        this.store.dispatch(new fromActions.LoadCurrencies());
    };
    ExchangeRateComponent.prototype.onBaseChange = function (base) {
        this.store.dispatch(new fromActions.SetBaseSymbol(base));
    };
    ExchangeRateComponent.prototype.onTargetChange = function (base) {
        this.store.dispatch(new fromActions.SetTargetSymbol(base));
    };
    ExchangeRateComponent.prototype.onAmountChange = function (amount) {
        this.store.dispatch(new fromActions.SetAmount(amount));
    };
    ExchangeRateComponent.prototype.onCurrenciesSwitched = function () {
        this.store.dispatch(new fromActions.SwitchCurrencies());
    };
    ExchangeRateComponent = __decorate([
        core_1.Component({
            selector: 'tme-exchange-rate',
            templateUrl: './exchange-rate.component.html',
            styleUrls: ['./exchange-rate.component.scss']
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], ExchangeRateComponent);
    return ExchangeRateComponent;
}());
exports.ExchangeRateComponent = ExchangeRateComponent;
//# sourceMappingURL=exchange-rate.component.js.map