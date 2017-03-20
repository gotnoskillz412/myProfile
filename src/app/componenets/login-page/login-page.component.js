"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var login_page_service_1 = require('./login-page.service');
require('rxjs/add/operator/toPromise');
var LoginPageComponent = (function () {
    function LoginPageComponent(loginPageService, router, activatedRoute) {
        this.loginPageService = loginPageService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.invalidCredentials = false;
        this.model = {
            username: null,
            password: null
        };
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.redirect = params['redirect_path'] || '/home';
        });
    };
    LoginPageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginPageService.sendLoginCredentials(this.model).then(function (response) {
            localStorage.setItem('myprofile_auth_token', response.json().token);
            _this.router.navigate([_this.redirect]);
        }, function (loginError) {
            _this.invalidCredentials = true;
            console.log('Error', loginError);
        });
    };
    LoginPageComponent = __decorate([
        core_1.Component({
            selector: 'app-login-page',
            templateUrl: './login-page.component.html',
            styleUrls: ['login-page.component.less'],
            providers: [login_page_service_1.LoginPageService]
        })
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
