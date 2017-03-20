/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var register_page_service_1 = require('./register-page.service');
var app_http_service_1 = require("../../app-http.service");
describe('RegisterPageService', function () {
    var testFinished;
    var mockHttpService = {
        post: function () {
            return {
                toPromise: function () {
                    testFinished = true;
                }
            };
        }
    };
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [register_page_service_1.RegisterPageService, { provide: app_http_service_1.AppHttpService, useValue: mockHttpService }]
        });
    });
    it('should test registerAccount', testing_1.inject([register_page_service_1.RegisterPageService], function (service) {
        var accountInfo = {
            username: 'test',
            password: 'test',
            email: 'test'
        };
        service.registerAccount(accountInfo);
        expect(testFinished).toBe(true);
    }));
});
