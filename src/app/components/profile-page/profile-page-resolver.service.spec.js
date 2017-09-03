"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var account_service_1 = require("../../helpers/account.service");
var profile_page_resolver_service_1 = require("./profile-page-resolver.service");
describe('ProfilePageResolverService', function () {
    var MockAccountService = (function () {
        function MockAccountService() {
        }
        MockAccountService.prototype.getProfile = function () {
            return Promise.resolve('test');
        };
        return MockAccountService;
    }());
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [profile_page_resolver_service_1.ProfilePageResolverService,
                { provide: account_service_1.AccountService, useClass: MockAccountService }
            ]
        });
    });
    it('should test resolve', testing_1.inject([profile_page_resolver_service_1.ProfilePageResolverService], function (service) {
        service.resolve(null, null).then(function (resp) {
            expect(resp).toBe('test');
        });
    }));
});
