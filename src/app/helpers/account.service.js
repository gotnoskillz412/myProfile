"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var environment_1 = require("../../environments/environment");
var AccountService = (function () {
    function AccountService(http) {
        this.http = http;
        this.profilePictureUpdateCallbacks = [];
    }
    AccountService.prototype.subscribeToProfilePictureUpdate = function (callback) {
        this.profilePictureUpdateCallbacks.push(callback);
    };
    AccountService.prototype.updateProfilePicture = function (profilePicture) {
        var _this = this;
        this.profilePicture = profilePicture;
        this.profilePictureUpdateCallbacks.forEach(function (cb) {
            cb(_this.profilePicture);
        });
    };
    AccountService.prototype.getAccount = function () {
        return this.http.get(common_1.Location.joinWithSlash(environment_1.environment.baseApi, 'auth/account')).toPromise()
            .then(function (response) {
            if (response) {
                return response.json().account;
            }
        });
    };
    AccountService.prototype.getProfile = function () {
        return this.http.get(common_1.Location.joinWithSlash(environment_1.environment.baseApi, 'auth/account')).toPromise()
            .then(function (response) {
            if (response) {
                return response.json().profile;
            }
            else {
                return null;
            }
        });
    };
    AccountService.prototype.logout = function () {
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable()
], AccountService);
exports.AccountService = AccountService;
