"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var router_1 = require("@angular/router");
var account_service_1 = require("../../helpers/account.service");
var forms_1 = require("@angular/forms");
var login_page_component_1 = require("./login-page.component");
var login_page_service_1 = require("./login-page.service");
describe('LoginPageComponent', function () {
    var component;
    var fixture;
    var testPicture = 'test_picture';
    var resultRedirectUrl;
    var updatedProfilePicture;
    var MockLoginPageService = (function () {
        function MockLoginPageService() {
        }
        MockLoginPageService.prototype.sendLoginCredentials = function () {
            return {
                then: function (cb, errCb) {
                    cb({
                        json: function () {
                            return {
                                profile: {
                                    picture: testPicture
                                }
                            };
                        }
                    });
                    errCb();
                }
            };
        };
        return MockLoginPageService;
    }());
    var MockAccountService = (function () {
        function MockAccountService() {
        }
        MockAccountService.prototype.updateProfilePicture = function (picture) {
            updatedProfilePicture = picture;
        };
        return MockAccountService;
    }());
    var MockRouter = (function () {
        function MockRouter() {
        }
        MockRouter.prototype.navigate = function (url) {
            resultRedirectUrl = url[0];
        };
        return MockRouter;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule],
            declarations: [login_page_component_1.LoginPageComponent],
            providers: [
                { provide: account_service_1.AccountService, useClass: MockAccountService },
                { provide: router_1.Router, useClass: MockRouter }
            ]
        }).overrideComponent(login_page_component_1.LoginPageComponent, {
            set: {
                providers: [{ provide: login_page_service_1.LoginPageService, useClass: MockLoginPageService }]
            }
        }).compileComponents();
    }));
    beforeEach(function () {
        updatedProfilePicture = null;
        resultRedirectUrl = null;
        fixture = testing_1.TestBed.createComponent(login_page_component_1.LoginPageComponent);
        component = fixture.componentInstance;
    });
    it('should test the ngOnInit', function () {
        component.ngOnInit();
        expect(component.invalidCredentials).toBe(false);
    });
    it('should test the onSubmit with profile picture', function () {
        component.onSubmit();
        expect(updatedProfilePicture).toBe(testPicture);
        expect(resultRedirectUrl).toBe('/goals');
        expect(component.invalidCredentials).toBe(true);
    });
    it('should test the onSubmit without profile picture', function () {
        testPicture = null;
        component.onSubmit();
        expect(updatedProfilePicture).toBe(null);
        expect(resultRedirectUrl).toBe('/goals');
        expect(component.invalidCredentials).toBe(true);
    });
});
