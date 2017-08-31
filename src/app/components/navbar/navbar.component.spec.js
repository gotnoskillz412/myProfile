"use strict";
var testing_1 = require("@angular/core/testing");
var navbar_component_1 = require("./navbar.component");
var option22_service_1 = require("../../helpers/option22.service");
var router_1 = require("@angular/router");
var account_service_1 = require("../../helpers/account.service");
var auth_service_1 = require("../../helpers/auth.service");
describe('NavbarComponent', function () {
    var component;
    var fixture;
    var loggedIn;
    var redirectedUrl;
    var pictureUpdated;
    var loggedOut;
    var tokenRemoved;
    var MockRouter = (function () {
        function MockRouter() {
        }
        MockRouter.prototype.navigate = function (url) {
            redirectedUrl = url[0];
        };
        return MockRouter;
    }());
    var MockAuthService = (function () {
        function MockAuthService() {
        }
        MockAuthService.prototype.loggedIn = function () {
            return loggedIn;
        };
        MockAuthService.prototype.removeToken = function () {
            tokenRemoved = true;
        };
        return MockAuthService;
    }());
    var MockAccountService = (function () {
        function MockAccountService() {
        }
        MockAccountService.prototype.updateProfilePicture = function () {
            pictureUpdated = true;
        };
        MockAccountService.prototype.subscribeToProfilePictureUpdate = function (cb) {
            cb('test_picture');
        };
        MockAccountService.prototype.getProfile = function () {
            return {
                then: function (cb) {
                    cb({
                        picture: 'test_picture'
                    });
                }
            };
        };
        MockAccountService.prototype.logout = function () {
            loggedOut = true;
        };
        return MockAccountService;
    }());
    var MockHttpService = (function () {
        function MockHttpService() {
        }
        MockHttpService.prototype.get = function () {
            return {
                toPromise: function () {
                    return {
                        then: function (cb) {
                            cb();
                        }
                    };
                }
            };
        };
        return MockHttpService;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [navbar_component_1.NavbarComponent],
            providers: [
                { provide: option22_service_1.Option22Service, useClass: MockHttpService },
                { provide: router_1.Router, useClass: MockRouter },
                { provide: account_service_1.AccountService, useClass: MockAccountService },
                { provide: auth_service_1.AuthService, useClass: MockAuthService },
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        loggedOut = null;
        loggedIn = null;
        redirectedUrl = null;
        tokenRemoved = null;
        pictureUpdated = null;
        fixture = testing_1.TestBed.createComponent(navbar_component_1.NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test the ngOnInit function, not logged In', function () {
        loggedIn = false;
        component.ngOnInit();
        expect(component.profilePicture).toBe('test_picture');
    });
    it('should test the ngOnInit function, logged In', function () {
        loggedIn = true;
        component.ngOnInit();
        expect(component.profilePicture).toBe('test_picture');
    });
    it('should test the loggedIn function', function () {
        loggedIn = true;
        expect(component.loggedIn()).toBe(true);
    });
    it('should test the logout function', function () {
        component.logout();
        expect(loggedOut).toBe(true);
        expect(redirectedUrl).toBe('/home');
        expect(pictureUpdated).toBe(true);
        expect(tokenRemoved).toBe(true);
    });
});
