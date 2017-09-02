"use strict";
var testing_1 = require("@angular/core/testing");
var helpers_service_1 = require("./helpers.service");
var account_1 = require("../models/account");
var account_service_1 = require("./account.service");
describe('HelpersService', function () {
    var mockAccount;
    var MockAccountService = (function () {
        function MockAccountService() {
        }
        MockAccountService.prototype.getAccount = function () {
            return Promise.resolve(mockAccount);
        };
        return MockAccountService;
    }());
    beforeEach(function () {
        mockAccount = null;
        testing_1.TestBed.configureTestingModule({
            providers: [helpers_service_1.HelpersService,
                { provide: account_service_1.AccountService, useClass: MockAccountService }
            ]
        });
    });
    it('should get AuthUri with account', testing_1.inject([helpers_service_1.HelpersService], function (service) {
        mockAccount = new account_1.Account();
        mockAccount._id = 'test';
        service.getAuthUri().then(function (resp) {
            expect(resp).toBe('http://localhost:3000/accounts/test');
        });
    }));
    it('should get AuthUri with no account', testing_1.inject([helpers_service_1.HelpersService], function (service) {
        service.getAuthUri().then(function (resp) {
            expect(resp).toBeNull();
        });
    }));
});
