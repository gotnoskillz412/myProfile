"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var common_1 = require("@angular/common");
var NavbarComponent = (function () {
    function NavbarComponent(http, router, accountService, authService) {
        this.http = http;
        this.router = router;
        this.accountService = accountService;
        this.authService = authService;
        this.logoutUrl = common_1.Location.joinWithSlash(environment_1.environment.baseApi, '/auth/logout');
    }
    NavbarComponent.prototype.loggedIn = function () {
        return this.authService.loggedIn();
    };
    NavbarComponent.prototype.logout = function () {
        var _this = this;
        this.http.get(this.logoutUrl).toPromise().then(function () {
            _this.accountService.logout();
            _this.authService.removeToken();
            _this.accountService.updateProfilePicture(null);
            _this.router.navigate(['/home']);
        });
    };
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.loggedIn()) {
            this.accountService.getProfile().then(function (profile) {
                _this.profilePicture = profile.picture;
            });
        }
        this.accountService.subscribeToProfilePictureUpdate(function (profilePicture) {
            _this.profilePicture = profilePicture;
        });
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'sfh-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.less']
    })
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
