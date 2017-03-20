/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var login_page_service_1 = require('./login-page.service');
var app_http_service_1 = require("../../app-http.service");
describe('LoginPageService', function () {
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
        testFinished = false;
        testing_1.TestBed.configureTestingModule({
            providers: [login_page_service_1.LoginPageService, { provide: app_http_service_1.AppHttpService, useValue: mockHttpService }]
        });
    });
    it('should ...', testing_1.inject([login_page_service_1.LoginPageService], function (service) {
        var creds = {
            username: 'test',
            password: 'test'
        };
        service.sendLoginCredentials(creds);
        expect(testFinished).toBe(true);
    }));
});
