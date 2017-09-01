"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var environment_1 = require("../../../environments/environment");
var ProfilePageService = (function () {
    function ProfilePageService(http, helpersService, accountService, authService) {
        this.http = http;
        this.helpersService = helpersService;
        this.accountService = accountService;
        this.authService = authService;
    }
    ProfilePageService.prototype.updateProfile = function (profile) {
        var _this = this;
        return this.helpersService.getAuthUri().then(function (url) {
            return _this.http.put(common_1.Location.joinWithSlash(url, "profiles/" + profile._id), profile).toPromise().then(function (response) {
                var profile = response.json();
                _this.accountService.updateProfilePicture(response.json().picture);
                return profile;
            });
        });
    };
    ProfilePageService.prototype.updatePassword = function (passwords, accountId) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "currentPassword=" + passwords.currentPassword + "&newPassword=" + passwords.newPassword;
        return this.http.put(common_1.Location.joinWithSlash(environment_1.environment.baseApi, "/auth/account/" + accountId + "/password"), body, options).toPromise().then(function (response) {
            _this.authService.setToken(response.json().token);
            return response.json().account;
        });
    };
    ProfilePageService.prototype.updateAccount = function (account) {
        var _this = this;
        return this.http.put(common_1.Location.joinWithSlash(environment_1.environment.baseApi, "/auth/account/" + account._id + "/update"), account).toPromise().then(function (response) {
            _this.authService.setToken(response.json().token);
            return response.json().account;
        });
    };
    return ProfilePageService;
}());
ProfilePageService = __decorate([
    core_1.Injectable()
], ProfilePageService);
exports.ProfilePageService = ProfilePageService;
