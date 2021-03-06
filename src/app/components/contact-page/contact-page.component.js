"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var contact_page_service_1 = require("./contact-page.service");
var ContactPageComponent = (function () {
    function ContactPageComponent(service, accountService) {
        this.service = service;
        this.accountService = accountService;
        this.emailSuccess = false;
        this.emailFailed = false;
        this.model = {
            name: null,
            email: null,
            message: null
        };
    }
    ContactPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getProfile().then(function (profile) {
            _this.model.name = profile.firstName + " " + profile.lastName;
        });
        this.accountService.getAccount().then(function (account) {
            _this.model.email = account.email;
        });
    };
    ContactPageComponent.prototype.setModel = function () {
        this.model.message = null;
    };
    ContactPageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.service.sendMessage(this.model).then(function () {
            _this.emailSuccess = true;
            _this.setModel();
        }, function () {
            _this.emailFailed = true;
        });
    };
    ContactPageComponent.prototype.showContactInfo = function () {
        this.emailFailed = false;
        this.emailSuccess = false;
    };
    return ContactPageComponent;
}());
ContactPageComponent = __decorate([
    core_1.Component({
        selector: 'sfh-contact-page',
        templateUrl: './contact-page.component.html',
        styleUrls: ['./contact-page.component.less'],
        providers: [contact_page_service_1.ContactPageService]
    })
], ContactPageComponent);
exports.ContactPageComponent = ContactPageComponent;
