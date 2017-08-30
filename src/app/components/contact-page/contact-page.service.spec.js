/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require("@angular/core/testing");
var contact_page_service_1 = require("./contact-page.service");
var option22_service_1 = require("../../helpers/option22.service");
describe('ContactPageService', function () {
    var requestHappeningResult = false;
    var requestFinishedResult = false;
    var mockHttpService = {
        requestHappening: function () {
            requestHappeningResult = true;
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
            providers: [contact_page_service_1.ContactPageService, { provide: option22_service_1.Option22Service, useValue: mockHttpService }]
        });
    });
    it('should test the send message function', testing_1.inject([contact_page_service_1.ContactPageService], function (service) {
        var emailInfo = {
            name: 'testName',
            email: 'testEmail@test.com',
            message: 'This is a test'
        };
        service.sendMessage(emailInfo);
        expect(requestHappeningResult).toBe(true);
        expect(requestFinishedResult).toBe(true);
    }));
});
