"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var exchange_rate_component_1 = require("./exchange-rate/exchange-rate.component");
var exchange_rate_service_1 = require("./exchange-rate.service");
var store_2 = require("./store");
var exchange_rate_form_component_1 = require("./exchange-rate-form/exchange-rate-form.component");
var ExchangeRateModule = /** @class */ (function () {
    function ExchangeRateModule() {
    }
    ExchangeRateModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                store_1.StoreModule.forFeature('exchange', store_2.reducers),
                effects_1.EffectsModule.forFeature(store_2.effects),
            ],
            exports: [
                exchange_rate_component_1.ExchangeRateComponent
            ],
            declarations: [exchange_rate_component_1.ExchangeRateComponent, exchange_rate_form_component_1.ExchangeRateFormComponent],
            providers: [
                exchange_rate_service_1.ExchangeRateService
            ]
        })
    ], ExchangeRateModule);
    return ExchangeRateModule;
}());
exports.ExchangeRateModule = ExchangeRateModule;
//# sourceMappingURL=exchange-rate.module.js.map