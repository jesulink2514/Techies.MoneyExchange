"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_module_1 = require("./core/core.module");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
// not used in production
var store_devtools_1 = require("@ngrx/store-devtools");
var ngrx_store_freeze_1 = require("ngrx-store-freeze");
var constants_1 = require("./shared/constants");
var shared_module_1 = require("./shared/shared.module");
var exchange_rate_module_1 = require("./exchange-rate/exchange-rate.module");
var main_layout_component_1 = require("./shared/main-layout/main-layout.component");
var exchange_rate_component_1 = require("./exchange-rate/exchange-rate/exchange-rate.component");
var app_component_1 = require("./app.component");
var environment_1 = require("../environments/environment");
var router_1 = require("@angular/router");
exports.metaReducers = !environment_1.environment.production
    ? [ngrx_store_freeze_1.storeFreeze]
    : [];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forRoot([
                    { path: '', pathMatch: 'full', redirectTo: 'rates' },
                    {
                        path: 'rates', component: main_layout_component_1.MainLayoutComponent, children: [
                            { path: '', component: exchange_rate_component_1.ExchangeRateComponent }
                        ]
                    }
                ]),
                store_1.StoreModule.forRoot({}, { metaReducers: exports.metaReducers }),
                effects_1.EffectsModule.forRoot([]),
                environment_1.environment.production ? [] : store_devtools_1.StoreDevtoolsModule.instrument(),
                exchange_rate_module_1.ExchangeRateModule
            ],
            providers: [
                { provide: constants_1.API_BASE_URL, useValue: environment_1.environment.apiBaseUrl }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map