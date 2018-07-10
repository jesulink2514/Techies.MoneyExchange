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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var constants_1 = require("../shared/constants");
var ExchangeRateService = /** @class */ (function () {
    function ExchangeRateService(baseUrl, http) {
        this.baseUrl = baseUrl;
        this.http = http;
    }
    ExchangeRateService.prototype.getExchangeRate = function (base, target) {
        var url = this.baseUrl + ("/api/exchangerate/latest?base=" + base + "&symbols=" + target);
        return this.http
            .get(url)
            .pipe(operators_1.catchError(function (error) { return rxjs_1.Observable.throw(error.json()); }));
    };
    ExchangeRateService.prototype.getAvailableCurrencies = function () {
        var url = this.baseUrl + '/api/currency';
        return this.http.get(url)
            .pipe(operators_1.catchError(function (error) { return rxjs_1.Observable.throw(error.json()); }));
    };
    ExchangeRateService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(constants_1.API_BASE_URL)),
        __metadata("design:paramtypes", [String, http_1.HttpClient])
    ], ExchangeRateService);
    return ExchangeRateService;
}());
exports.ExchangeRateService = ExchangeRateService;
//# sourceMappingURL=exchange-rate.service.js.map