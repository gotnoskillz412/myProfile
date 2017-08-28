"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var register_page_component_1 = require('./register-page.component');
var register_page_service_1 = require("./register-page.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
describe('RegisterPageComponent', function () {
    var component;
    var fixture;
    var resultUrl;
    var testToken = 'test_token';
    var testErrorStatus = 400;
    var testErrorMessage = 'test_error_message email';
    var mockRegisterPageService = {
        registerAccount: function () {
            return {
                then: function (cb, errCb) {
                    cb({
                        json: function () {
                            return {
                                token: testToken
                            };
                        }
                    });
                    errCb({
                        status: testErrorStatus,
                        json: function () {
                            return {
                                message: testErrorMessage
                            };
                        }
                    });
                }
            };
        }
    };
    var mockRouter = {
        navigate: function (url) {
            resultUrl = url[0];
        }
    };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule],
            declarations: [register_page_component_1.RegisterPageComponent]
        }).overrideComponent(register_page_component_1.RegisterPageComponent, {
            set: {
                providers: [{ provide: register_page_service_1.RegisterPageService, useValue: mockRegisterPageService },
                    { provide: router_1.Router, useValue: mockRouter }]
            }
        })
            .compileComponents();
    }));
    beforeEach(function () {
        resultUrl = null;
        fixture = testing_1.TestBed.createComponent(register_page_component_1.RegisterPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test onSubmit', function () {
        component.onSubmit();
        expect(localStorage.getItem('myprofile_auth_token')).toBe(testToken);
        expect(resultUrl).toBe('/home');
        testErrorMessage = 'username';
        component.onSubmit();
    });
});
