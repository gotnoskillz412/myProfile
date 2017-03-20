"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var profile_page_service_1 = require("./profile-page.service");
var ProfilePageComponent = (function () {
    function ProfilePageComponent(service) {
        this.service = service;
        this.loaded = false;
    }
    ProfilePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.testCredentials().then(function () {
            _this.loaded = true;
        });
    };
    ProfilePageComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-page',
            templateUrl: './profile-page.component.html',
            styleUrls: ['./profile-page.component.less'],
            providers: [profile_page_service_1.ProfilePageService]
        })
    ], ProfilePageComponent);
    return ProfilePageComponent;
}());
exports.ProfilePageComponent = ProfilePageComponent;
