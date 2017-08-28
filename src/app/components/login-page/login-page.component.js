"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var login_page_service_1 = require("./login-page.service");
var LoginPageComponent = (function () {
    function LoginPageComponent(loginPageService, router, accountService) {
        this.loginPageService = loginPageService;
        this.router = router;
        this.accountService = accountService;
        this.invalidCredentials = false;
        this.model = {
            username: null,
            password: null
        };
    }
    LoginPageComponent.prototype.ngOnInit = function () {
    };
    LoginPageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginPageService.sendLoginCredentials(this.model).then(function (response) {
            if (response.json().profile.picture) {
                _this.accountService.updateProfilePicture(response.json().profile.picture);
            }
            _this.router.navigate(['/goals']);
        }, function () {
            _this.invalidCredentials = true;
        });
    };
    return LoginPageComponent;
}());
LoginPageComponent = __decorate([
    core_1.Component({
        selector: 'sfh-login-page',
        templateUrl: './login-page.component.html',
        styleUrls: ['login-page.component.less'],
        providers: [login_page_service_1.LoginPageService]
    })
], LoginPageComponent);
exports.LoginPageComponent = LoginPageComponent;
