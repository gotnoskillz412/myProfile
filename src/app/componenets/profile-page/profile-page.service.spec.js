/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var profile_page_service_1 = require('./profile-page.service');
var app_http_service_1 = require("../../app-http.service");
describe('ProfilePageService', function () {
    var testComplete;
    var mockHttpService = {
        get: function () {
            return {
                toPromise: function () {
                    testComplete = true;
                }
            };
        }
    };
    beforeEach(function () {
        testComplete = false;
        testing_1.TestBed.configureTestingModule({
            providers: [profile_page_service_1.ProfilePageService, { provide: app_http_service_1.AppHttpService, useValue: mockHttpService }]
        });
    });
    it('should test testCredentials', testing_1.inject([profile_page_service_1.ProfilePageService], function (service) {
        service.testCredentials();
        expect(testComplete).toBe(true);
    }));
});
