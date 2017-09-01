/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require("@angular/core/testing");
var profile_page_service_1 = require("./profile-page.service");
var option22_service_1 = require("../../helpers/option22.service");
var profile_1 = require("../../models/profile");
var account_1 = require("../../models/account");
var helpers_service_1 = require("../../helpers/helpers.service");
var account_service_1 = require("../../helpers/account.service");
var auth_service_1 = require("../../helpers/auth.service");
describe('ProfilePageService', function () {
    var updatePicture;
    var tokenSet;
    var mockAccount = new account_1.Account();
    mockAccount.username = 'test_username';
    var MockHttpService = (function () {
        function MockHttpService() {
        }
        MockHttpService.prototype.put = function () {
            return {
                toPromise: function () {
                    return {
                        then: function (cb) {
                            var result = {
                                json: function () {
                                    return {
                                        picture: 'test_picture',
                                        account: mockAccount,
                                        token: 'test_token'
                                    };
                                }
                            };
                            return Promise.resolve(cb(result));
                        }
                    };
                }
            };
        };
        return MockHttpService;
    }());
    var MockHelpersService = (function () {
        function MockHelpersService() {
        }
        MockHelpersService.prototype.getAuthUri = function () {
            return {
                then: function (cb) {
                    return cb('authuri');
                }
            };
        };
        return MockHelpersService;
    }());
    var MockAccountService = (function () {
        function MockAccountService() {
        }
        MockAccountService.prototype.updateProfilePicture = function () {
            updatePicture = true;
        };
        return MockAccountService;
    }());
    var MockAuthService = (function () {
        function MockAuthService() {
        }
        MockAuthService.prototype.setToken = function () {
            tokenSet = true;
        };
        return MockAuthService;
    }());
    beforeEach(function () {
        updatePicture = null;
        tokenSet = false;
        testing_1.TestBed.configureTestingModule({
            providers: [profile_page_service_1.ProfilePageService,
                { provide: option22_service_1.Option22Service, useClass: MockHttpService },
                { provide: helpers_service_1.HelpersService, useClass: MockHelpersService },
                { provide: account_service_1.AccountService, useClass: MockAccountService },
                { provide: auth_service_1.AuthService, useClass: MockAuthService }
            ]
        });
    });
    it('should test the updateProfile', testing_1.inject([profile_page_service_1.ProfilePageService], function (service) {
        var testProfile = new profile_1.Profile();
        testProfile._id = 'test';
        service.updateProfile(testProfile).then(function (resp) {
            expect(resp.picture).toBe('test_picture');
            expect(updatePicture).toBe(true);
        });
    }));
    it('should test the updatePassword', testing_1.inject([profile_page_service_1.ProfilePageService], function (service) {
        var passwords = {
            currentPassword: 'current',
            newPassword: 'new'
        };
        service.updatePassword(passwords, 'test').then(function (resp) {
            expect(resp.username).toBe('test_username');
            expect(tokenSet).toBe(true);
        });
    }));
    it('should test the updatePassword', testing_1.inject([profile_page_service_1.ProfilePageService], function (service) {
        service.updateAccount(mockAccount).then(function (resp) {
            expect(resp.username).toBe('test_username');
            expect(tokenSet).toBe(true);
        });
    }));
});
