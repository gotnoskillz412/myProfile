/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require("@angular/core/testing");
var register_page_service_1 = require("./register-page.service");
var option22_service_1 = require("../../helpers/option22.service");
var auth_service_1 = require("../../helpers/auth.service");
describe('RegisterPageService', function () {
    var loggedIn;
    var token;
    var MockHttpService = (function () {
        function MockHttpService() {
        }
        MockHttpService.prototype.post = function () {
            return {
                toPromise: function () {
                    return Promise.resolve({
                        json: function () {
                            return {
                                token: 'test_token'
                            };
                        }
                    });
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
            token = null;
        };
        MockAuthService.prototype.setToken = function (t) {
            token = t;
        };
        return MockAuthService;
    }());
    beforeEach(function () {
        token = null;
        loggedIn = null;
        testing_1.TestBed.configureTestingModule({
            providers: [
                register_page_service_1.RegisterPageService,
                { provide: option22_service_1.Option22Service, useClass: MockHttpService },
                { provide: auth_service_1.AuthService, useClass: MockAuthService }
            ]
        });
    });
    it('should test registerAccount while logged in', testing_1.inject([register_page_service_1.RegisterPageService], function (service) {
        var accountInfo = {
            username: 'test',
            password: 'test',
            email: 'test'
        };
        token = 'test';
        loggedIn = true;
        service.registerAccount(accountInfo).then(function () {
            expect(token).toBe('test_token');
        });
    }));
    it('should test registerAccount while logged out', testing_1.fakeAsync(testing_1.inject([register_page_service_1.RegisterPageService], function (service) {
        var accountInfo = {
            username: 'test',
            password: 'test',
            email: 'test'
        };
        loggedIn = false;
        service.registerAccount(accountInfo);
        testing_1.tick();
        expect(token).toBe('test_token');
    })));
});
