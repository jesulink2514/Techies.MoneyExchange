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
var forms_1 = require("../../../../node_modules/@angular/forms");
var ExchangeRateFormComponent = /** @class */ (function () {
    function ExchangeRateFormComponent(fb) {
        this.fb = fb;
        this.currencies = [];
        this.baseChanged = new core_1.EventEmitter();
        this.targetChanged = new core_1.EventEmitter();
        this.amountChanged = new core_1.EventEmitter();
        this.currenciesSwitched = new core_1.EventEmitter();
        this.form = this.fb.group({
            'base': [''],
            'target': [''],
            'amount': [0]
        });
    }
    Object.defineProperty(ExchangeRateFormComponent.prototype, "base", {
        set: function (value) {
            this.form.controls['base'].setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExchangeRateFormComponent.prototype, "target", {
        set: function (value) {
            this.form.controls['target'].setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    ExchangeRateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form.controls['base'].valueChanges.subscribe(function (v) { return _this.baseChanged.emit(v); });
        this.form.controls['target'].valueChanges.subscribe(function (v) { return _this.targetChanged.emit(v); });
        this.form.controls['amount'].valueChanges.subscribe(function (v) { return _this.amountChanged.emit(v); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ExchangeRateFormComponent.prototype, "currencies", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ExchangeRateFormComponent.prototype, "base", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ExchangeRateFormComponent.prototype, "target", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ExchangeRateFormComponent.prototype, "amount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ExchangeRateFormComponent.prototype, "convertedAmount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ExchangeRateFormComponent.prototype, "rate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ExchangeRateFormComponent.prototype, "baseChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ExchangeRateFormComponent.prototype, "targetChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ExchangeRateFormComponent.prototype, "amountChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ExchangeRateFormComponent.prototype, "currenciesSwitched", void 0);
    ExchangeRateFormComponent = __decorate([
        core_1.Component({
            selector: 'tme-exchange-rate-form',
            templateUrl: './exchange-rate-form.component.html',
            styleUrls: ['./exchange-rate-form.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], ExchangeRateFormComponent);
    return ExchangeRateFormComponent;
}());
exports.ExchangeRateFormComponent = ExchangeRateFormComponent;
//# sourceMappingURL=exchange-rate-form.component.js.map