"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var register_page_component_1 = require("./register-page.component");
var register_page_service_1 = require("./register-page.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var dist_1 = require("angular2-notifications/dist");
describe('RegisterPageComponent', function () {
    var component;
    var fixture;
    var resultUrl;
    var notificationSuccess;
    var MockRegisterPageService = (function () {
        function MockRegisterPageService() {
        }
        MockRegisterPageService.prototype.registerAccount = function () {
            return Promise.resolve();
        };
        return MockRegisterPageService;
    }());
    var MockRouter = (function () {
        function MockRouter() {
        }
        MockRouter.prototype.navigate = function (url) {
            resultUrl = url[0];
        };
        return MockRouter;
    }());
    var MockNotificationsService = (function () {
        function MockNotificationsService() {
        }
        MockNotificationsService.prototype.success = function () {
            notificationSuccess = true;
        };
        return MockNotificationsService;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule],
            declarations: [register_page_component_1.RegisterPageComponent],
            providers: [
                { provide: router_1.Router, useClass: MockRouter },
                { provide: dist_1.NotificationsService, useClass: MockNotificationsService }
            ]
        }).overrideComponent(register_page_component_1.RegisterPageComponent, {
            set: {
                providers: [{ provide: register_page_service_1.RegisterPageService, useClass: MockRegisterPageService }]
            }
        }).compileComponents();
    }));
    beforeEach(function () {
        resultUrl = null;
        notificationSuccess = null;
        fixture = testing_1.TestBed.createComponent(register_page_component_1.RegisterPageComponent);
        component = fixture.componentInstance;
    });
    it('should test onSubmit', testing_1.fakeAsync(function () {
        component.onSubmit();
        testing_1.tick();
        expect(notificationSuccess).toBe(true);
        expect(resultUrl).toBe('/goals');
    }));
});
