'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var register_page_service_1 = require('./register-page.service');
var RegisterPageComponent = (function () {
    function RegisterPageComponent(registerPageService, router) {
        this.registerPageService = registerPageService;
        this.router = router;
        this.passwordFormatValid = true;
        this.emailFormatValid = true;
        this.model = {
            email: null,
            username: null,
            password: null,
            confirmPassword: null
        };
    }
    RegisterPageComponent.prototype.ngOnInit = function () {
    };
    RegisterPageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.registerPageService.registerAccount(this.model).then(function (response) {
            localStorage.setItem('myprofile_auth_token', response.json().token);
            _this.router.navigate(['/home']);
        }, function (registerError) {
            // TODO need to do Error codes
            var status = registerError.status;
            var message = registerError.json() && registerError.json().message && registerError.json().message.toLowerCase();
            // Check for reasons why
            if (status === 400 && message && message.indexOf('email') !== -1) {
            }
            else if (status === 400 && message && message.indexOf('username')) {
            }
        });
    };
    RegisterPageComponent = __decorate([
        core_1.Component({
            selector: 'app-register-page',
            templateUrl: './register-page.component.html',
            styleUrls: ['register-page.component.less'],
            providers: [register_page_service_1.RegisterPageService]
        })
    ], RegisterPageComponent);
    return RegisterPageComponent;
}());
exports.RegisterPageComponent = RegisterPageComponent;
