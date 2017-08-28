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
var common_1 = require("@angular/common");
var ng2_img_cropper_1 = require("ng2-img-cropper");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var ProfilePictureModalComponent = (function (_super) {
    __extends(ProfilePictureModalComponent, _super);
    function ProfilePictureModalComponent(dialogService, http, accountService, helpersService) {
        var _this = _super.call(this, dialogService) || this;
        _this.http = http;
        _this.accountService = accountService;
        _this.helpersService = helpersService;
        _this.profileCropperSettings = new ng2_img_cropper_1.CropperSettings();
        _this.profileCropperSettings.width = 300;
        _this.profileCropperSettings.height = 300;
        _this.profileCropperSettings.croppedWidth = 200;
        _this.profileCropperSettings.croppedHeight = 200;
        _this.profileCropperSettings.canvasWidth = 350;
        _this.profileCropperSettings.canvasHeight = 350;
        _this.profileCropperSettings.noFileInput = true;
        _this.profileCropperSettings.rounded = true;
        _this.data = {};
        return _this;
    }
    ProfilePictureModalComponent.prototype.fileChangeListener = function ($event) {
        var _this = this;
        this.image = new Image();
        var file = $event.target.files[0];
        var myReader = new FileReader();
        myReader.onloadend = function (loadEvent) {
            _this.image.src = loadEvent.target.result;
            _this.profileCropper.setImage(_this.image);
        };
        myReader.readAsDataURL(file);
    };
    ProfilePictureModalComponent.prototype.confirm = function () {
        var _this = this;
        this.accountService.getProfile()
            .then(function (profile) {
            _this.profile = profile;
            profile.picture = _this.data.image;
            return _this.helpersService.getAuthUri();
        })
            .then(function (authUri) {
            var profileUpdateUri = common_1.Location.joinWithSlash(authUri, "profiles/" + _this.profile._id);
            _this.http.put(profileUpdateUri, _this.profile).toPromise().then(function (response) {
                _this.accountService.updateProfilePicture(response.json().picture);
                _this.result = _this.data;
                _this.close();
            });
        });
    };
    return ProfilePictureModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
__decorate([
    core_1.ViewChild('profileCropper', undefined)
], ProfilePictureModalComponent.prototype, "profileCropper");
__decorate([
    core_1.ViewChild('profileEditorModal')
], ProfilePictureModalComponent.prototype, "profileEditorModal");
ProfilePictureModalComponent = __decorate([
    core_1.Component({
        selector: 'sfh-profile-picture-modal',
        templateUrl: './profile-picture-modal.component.html',
        styleUrls: ['./profile-picture-modal.component.less']
    })
], ProfilePictureModalComponent);
exports.ProfilePictureModalComponent = ProfilePictureModalComponent;
