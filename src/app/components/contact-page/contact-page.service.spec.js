"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var contact_page_service_1 = require("./contact-page.service");
var option22_service_1 = require("../../helpers/option22.service");
describe('ContactPageService', function () {
    var mockHttpService = {
        post: function (url, emailInfo) {
            return {
                toPromise: function () {
                    return {
                        then: function (cb) {
                            return Promise.resolve(cb(emailInfo));
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
        service.sendMessage(emailInfo).then(function (response) {
            expect(response.name).toBe(emailInfo.name);
            expect(response.email).toBe(emailInfo.email);
            expect(response.message).toBe(emailInfo.message);
        });
    }));
});
