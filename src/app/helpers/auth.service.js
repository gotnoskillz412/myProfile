"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var AuthService = AuthService_1 = (function () {
    function AuthService() {
    }
    AuthService.getTokenKey = function () {
        return "myprofile_" + environment_1.environment.tokenKey + "_auth_token";
    };
    AuthService.getExpirationKey = function () {
        return "myprofile_" + environment_1.environment.tokenKey + "_expiration";
    };
    AuthService.loggedIn = function () {
        var token = localStorage.getItem(AuthService_1.getTokenKey());
        var expiration = localStorage.getItem(AuthService_1.getExpirationKey());
        var now = new Date().getTime();
        if (token && expiration && parseInt(expiration, 10) && parseInt(expiration, 10) > now) {
            return true;
        }
        else {
            localStorage.removeItem(AuthService_1.getTokenKey());
            localStorage.removeItem(AuthService_1.getExpirationKey());
            return false;
        }
    };
    ;
    AuthService.getToken = function () {
        return localStorage.getItem(AuthService_1.getTokenKey());
    };
    AuthService.setToken = function (token) {
        var oneHourFromNow = new Date().getTime() + (1000 * 3600);
        localStorage.setItem(AuthService_1.getTokenKey(), token);
        localStorage.setItem(AuthService_1.getExpirationKey(), oneHourFromNow.toString());
    };
    AuthService.removeToken = function () {
        localStorage.removeItem(AuthService_1.getTokenKey());
        localStorage.removeItem(AuthService_1.getExpirationKey());
    };
    return AuthService;
}());
AuthService = AuthService_1 = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
var AuthService_1;
