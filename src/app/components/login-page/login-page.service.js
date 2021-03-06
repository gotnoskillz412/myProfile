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
var LoginPageService = (function () {
    function LoginPageService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.loginUrl = common_1.Location.joinWithSlash(environment_1.environment.baseApi, 'auth/login');
    }
    LoginPageService.prototype.sendLoginCredentials = function (creds) {
        var _this = this;
        if (this.authService.loggedIn()) {
            this.authService.removeToken();
        }
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "username=" + creds.username + "&password=" + creds.password;
        return this.http.post(this.loginUrl, body, options).toPromise().then(function (response) {
            _this.authService.setToken(response.json().token);
            return response;
        });
    };
    return LoginPageService;
}());
LoginPageService = __decorate([
    core_1.Injectable()
], LoginPageService);
exports.LoginPageService = LoginPageService;
