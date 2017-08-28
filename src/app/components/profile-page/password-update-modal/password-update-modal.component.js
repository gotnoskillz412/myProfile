"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var profile_page_service_1 = require("../profile-page.service");
var PasswordUpdateModalComponent = (function (_super) {
    __extends(PasswordUpdateModalComponent, _super);
    function PasswordUpdateModalComponent(dialogService, profilePageService) {
        var _this = _super.call(this, dialogService) || this;
        _this.profilePageService = profilePageService;
        _this.passwords = {
            currentPassword: null,
            confirmPassword: null,
            newPassword: null
        };
        return _this;
    }
    PasswordUpdateModalComponent.prototype.confirm = function () {
        var _this = this;
        this.profilePageService.updatePassword(this.passwords, this.account._id).then(function (response) {
            _this.result = response;
            _this.close();
        });
    };
    return PasswordUpdateModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
PasswordUpdateModalComponent = __decorate([
    core_1.Component({
        selector: 'sfh-password-update-modal',
        templateUrl: './password-update-modal.component.html',
        styleUrls: ['./password-update-modal.component.less'],
        providers: [profile_page_service_1.ProfilePageService]
    })
], PasswordUpdateModalComponent);
exports.PasswordUpdateModalComponent = PasswordUpdateModalComponent;
