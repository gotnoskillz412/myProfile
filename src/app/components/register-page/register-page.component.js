"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var register_page_service_1 = require("./register-page.service");
var RegisterPageComponent = (function () {
    function RegisterPageComponent(registerPageService, notifications, router) {
        this.registerPageService = registerPageService;
        this.notifications = notifications;
        this.router = router;
        this.model = {
            email: null,
            firstName: null,
            lastName: null,
            username: null,
            password: null,
            confirmPassword: null
        };
    }
    RegisterPageComponent.prototype.ngOnInit = function () {
    };
    RegisterPageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.registerPageService.registerAccount(this.model).then(function () {
            _this.notifications.success('Created Account', 'New Account Created Successfully');
            _this.router.navigate(['/goals']);
        });
    };
    return RegisterPageComponent;
}());
RegisterPageComponent = __decorate([
    core_1.Component({
        selector: 'sfh-register-page',
        templateUrl: './register-page.component.html',
        styleUrls: ['register-page.component.less'],
        providers: [register_page_service_1.RegisterPageService]
    })
], RegisterPageComponent);
exports.RegisterPageComponent = RegisterPageComponent;
