/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var contact_page_service_1 = require('./contact-page.service');
var app_http_service_1 = require("../../app-http.service");
describe('ContactPageService', function () {
    var requestHapeningResult = false;
    var requestFinishedResult = false;
    var mockHttpService = {
        requestHappening: function () {
            requestHapeningResult = true;
        },
        requestFinished: function () {
            requestFinishedResult = true;
        },
        post: function () {
            return {
                toPromise: function () {
                    return {
                        then: function (cb) {
                            cb();
                        }
                    };
                }
            };
        }
    };
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [contact_page_service_1.ContactPageService, { provide: app_http_service_1.AppHttpService, useValue: mockHttpService }]
        });
    });
    it('should test the send message function', testing_1.inject([contact_page_service_1.ContactPageService], function (service) {
        var emailInfo = {
            name: 'testName',
            email: 'testEmail@test.com',
            message: 'This is a test'
        };
        service.sendMessage(emailInfo);
        expect(requestHapeningResult).toBe(true);
        expect(requestFinishedResult).toBe(true);
    }));
});
