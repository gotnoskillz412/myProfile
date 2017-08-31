/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require("@angular/core/testing");
var login_page_service_1 = require("./login-page.service");
var option22_service_1 = require("../../helpers/option22.service");
var auth_service_1 = require("../../helpers/auth.service");
describe('LoginPageService', function () {
    var loggedIn;
    var tokenRemoved;
    var token;
    var MockHttpService = (function () {
        function MockHttpService() {
        }
        MockHttpService.prototype.post = function () {
            return {
                toPromise: function () {
                    return {
                        then: function (cb) {
                            var result = cb({
                                json: function () {
                                    return {
                                        token: 'test_token'
                                    };
                                }
                            });
                            return Promise.resolve(result);
                        }
                    };
                }
            };
        };
        return MockHttpService;
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
        MockAuthService.prototype.setToken = function (t) {
            token = t;
        };
        return MockAuthService;
    }());
    beforeEach(function () {
        loggedIn = null;
        tokenRemoved = null;
        token = null;
        testing_1.TestBed.configureTestingModule({
            providers: [login_page_service_1.LoginPageService,
                { provide: option22_service_1.Option22Service, useClass: MockHttpService },
                { provide: auth_service_1.AuthService, useClass: MockAuthService }
            ]
        });
    });
    it('should test the send Login Credentials while logged in', testing_1.inject([login_page_service_1.LoginPageService], function (service) {
        var creds = {
            username: 'test',
            password: 'test'
        };
        loggedIn = true;
        service.sendLoginCredentials(creds).then(function () {
            expect(tokenRemoved).toBe(true);
            expect(token).toBe('test_token');
        });
    }));
    it('should test the send Login Credentials while logged out', testing_1.inject([login_page_service_1.LoginPageService], function (service) {
        var creds = {
            username: 'test',
            password: 'test'
        };
        loggedIn = false;
        service.sendLoginCredentials(creds).then(function () {
            expect(tokenRemoved).toBeNull();
            expect(token).toBe('test_token');
        });
    }));
});
