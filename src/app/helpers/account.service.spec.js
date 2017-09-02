"use strict";
var testing_1 = require("@angular/core/testing");
var account_service_1 = require("./account.service");
var option22_service_1 = require("./option22.service");
describe('AccountService', function () {
    var MockHttpService = (function () {
        function MockHttpService() {
        }
        MockHttpService.prototype.get = function () {
            return {
                toPromise: function () {
                    var result = {
                        json: function () {
                            return {
                                account: 'account',
                                profile: 'profile'
                            };
                        }
                    };
                    return Promise.resolve(result);
                }
            };
        };
        return MockHttpService;
    }());
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [account_service_1.AccountService,
                { provide: option22_service_1.Option22Service, useClass: MockHttpService }
            ]
        });
    });
    it('should test subscribe and update', testing_1.inject([account_service_1.AccountService], function (service) {
        var profilePicture = null;
        service.subscribeToProfilePictureUpdate(function (profilePic) {
            profilePicture = profilePic;
        });
        service.updateProfilePicture('test');
        expect(profilePicture).toBe('test');
    }));
    it('should test getAccount', testing_1.inject([account_service_1.AccountService], function (service) {
        service.getAccount().then(function (resp) {
            expect(resp).toBe('account');
        });
    }));
    it('should test getProfile', testing_1.inject([account_service_1.AccountService], function (service) {
        service.getAccount().then(function (resp) {
            expect(resp).toBe('profile');
        });
    }));
});
