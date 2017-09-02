"use strict";
var testing_1 = require("@angular/core/testing");
var auth_service_1 = require("./auth.service");
describe('AuthService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [auth_service_1.AuthService]
        });
    });
    it('should test token handling', testing_1.inject([auth_service_1.AuthService], function (service) {
        service.setToken('test_token');
        expect(service.getToken()).toBe('test_token');
        service.removeToken();
        expect(service.getToken()).toBeNull();
    }));
    it('should test loggedIn while not logged in', testing_1.inject([auth_service_1.AuthService], function (service) {
        expect(service.loggedIn()).toBe(false);
    }));
    it('should test loggedIn while logged in', testing_1.inject([auth_service_1.AuthService], function (service) {
        service.setToken(('test_token'));
        expect(service.loggedIn()).toBe(true);
    }));
});
