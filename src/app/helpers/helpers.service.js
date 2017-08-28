"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var HelpersService = (function () {
    function HelpersService(accountService) {
        this.accountService = accountService;
    }
    HelpersService.prototype.getAuthUri = function () {
        var accountIndex;
        return this.accountService.getAccount().then(function (account) {
            if (account) {
                var accountId = account ? account._id : 'null';
                var authUri = environment_1.environment.authApi;
                var uriParams = authUri.split('/');
                accountIndex = uriParams.indexOf(':accountId');
                uriParams[accountIndex] = accountId;
                return uriParams.join('/');
            }
            return null;
        });
    };
    return HelpersService;
}());
HelpersService = __decorate([
    core_1.Injectable()
], HelpersService);
exports.HelpersService = HelpersService;
