"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ValidateEqualDirective = ValidateEqualDirective_1 = (function () {
    function ValidateEqualDirective(validateEqual) {
        this.validateEqual = validateEqual;
    }
    ValidateEqualDirective.prototype.validate = function (control) {
        var value = control.value;
        var e = control.root.get(this.validateEqual);
        if (e && e.value !== value) {
            return {
                sfhValidateEqual: false
            };
        }
        return null;
    };
    return ValidateEqualDirective;
}());
ValidateEqualDirective = ValidateEqualDirective_1 = __decorate([
    core_1.Directive({
        selector: '[sfhValidateEqual][formControlName],[sfhValidateEqual][formControl],[sfhValidateEqual][ngModel]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return ValidateEqualDirective_1; }), multi: true }]
    }),
    __param(0, core_1.Attribute('sfhValidateEqual'))
], ValidateEqualDirective);
exports.ValidateEqualDirective = ValidateEqualDirective;
var ValidateEqualDirective_1;
