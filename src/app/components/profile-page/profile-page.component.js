"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var password_update_modal_component_1 = require("./password-update-modal/password-update-modal.component");
var profile_page_service_1 = require("./profile-page.service");
var profile_picture_modal_component_1 = require("./profile-picture-modal/profile-picture-modal.component");
var ProfilePageComponent = (function () {
    function ProfilePageComponent(route, dialogService, accountService, notifications, profileService) {
        this.route = route;
        this.dialogService = dialogService;
        this.accountService = accountService;
        this.notifications = notifications;
        this.profileService = profileService;
        this.saving = false;
        this.sections = {
            aboutMe: 'aboutMe',
            security: 'security'
        };
        this.infoSection = this.sections.aboutMe;
        this.data = {};
    }
    ProfilePageComponent.prototype.updateProfile = function () {
        var _this = this;
        if (!this.saving) {
            this.saving = true;
            this.profileService.updateProfile(this.profile).then(function (profile) {
                _this.profile = profile;
                _this.saving = false;
                _this.notifications.success('Updated', 'Profile Updated Successfully');
            })["catch"](function () {
                _this.saving = false;
            });
        }
    };
    ProfilePageComponent.prototype.updateAccount = function () {
        var _this = this;
        if (!this.saving) {
            this.saving = true;
            this.profileService.updateAccount(this.account).then(function (account) {
                _this.account = account;
                _this.saving = false;
                _this.notifications.success('Updated', 'Account Updated Successfully');
            })["catch"](function () {
                _this.saving = false;
            });
        }
    };
    ProfilePageComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialogService.addDialog(profile_picture_modal_component_1.ProfilePictureModalComponent, {
            title: 'Add Your Picture'
        })
            .subscribe(function (data) {
            if (data) {
                _this.data = data;
                _this.accountService.getProfile().then(function (profile) {
                    _this.profile = profile;
                    _this.notifications.success('Updated', 'Profile Picture Updated Successfully');
                });
            }
        });
    };
    ProfilePageComponent.prototype.openPasswordModal = function () {
        var _this = this;
        this.dialogService.addDialog(password_update_modal_component_1.PasswordUpdateModalComponent, {
            title: 'Update Your Password',
            account: this.account
        })
            .subscribe(function (account) {
            if (account) {
                _this.account = account;
                _this.notifications.success('Updated', 'Password Updated Successfully');
            }
        });
    };
    ProfilePageComponent.prototype.addLike = function (like) {
        if (like.trim().length > 0 && this.profile.likes.indexOf(like.trim()) === -1) {
            this.profile.likes.push(like);
        }
    };
    ProfilePageComponent.prototype.loadSecurityInfo = function () {
        var _this = this;
        if (this.infoSection !== this.sections.security) {
            this.accountService.getAccount().then(function (response) {
                _this.account = response;
                _this.infoSection = _this.sections.security;
            });
        }
    };
    ProfilePageComponent.prototype.loadAboutMeInfo = function () {
        var _this = this;
        if (this.infoSection !== this.sections.aboutMe) {
            this.accountService.getProfile().then(function (response) {
                _this.profile = response;
                _this.infoSection = _this.sections.aboutMe;
            });
        }
    };
    ProfilePageComponent.prototype.removeLike = function () {
        var _this = this;
        return function (index) {
            if (_this.profile && Array.isArray(_this.profile.likes) && _this.profile.likes[index] != null) {
                _this.profile.likes.splice(index, 1);
            }
        };
    };
    ProfilePageComponent.prototype.ngOnInit = function () {
        this.profile = this.route.snapshot.data['profile'];
        if (this.profile.picture != null) {
            this.data.image = this.profile.picture;
            this.accountService.updateProfilePicture(this.profile.picture);
        }
    };
    return ProfilePageComponent;
}());
ProfilePageComponent = __decorate([
    core_1.Component({
        selector: 'sfh-profile-page',
        templateUrl: './profile-page.component.html',
        styleUrls: ['./profile-page.component.less'],
        providers: [profile_page_service_1.ProfilePageService]
    })
], ProfilePageComponent);
exports.ProfilePageComponent = ProfilePageComponent;
