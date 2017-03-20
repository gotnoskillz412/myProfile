/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var home_page_service_1 = require('./home-page.service');
describe('HomePageService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [home_page_service_1.HomePageService]
        });
    });
    it('should ...', testing_1.inject([home_page_service_1.HomePageService], function (service) {
        expect(service).toBeTruthy();
    }));
});
