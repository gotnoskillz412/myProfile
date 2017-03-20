"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var login_page_component_1 = require('./login-page.component');
var login_page_service_1 = require("./login-page.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
describe('LoginPageComponent', function () {
    var component;
    var fixture;
    var testPath;
    var testToken = 'test_token';
    var resultRedirectUrl = null;
    var mockLoginPageService = {
        sendLoginCredentials: function () {
            return {
                then: function (cb, errCb) {
                    cb({
                        json: function () {
                            return {
                                token: testToken
                            };
                        }
                    });
                    errCb();
                }
            };
        }
    };
    var mockActivatedRoute = {
        queryParams: {
            subscribe: function (cb) {
                cb({ redirect_path: testPath });
            }
        }
    };
    var mockRouter = {
        navigate: function (url) {
            resultRedirectUrl = url[0];
        }
    };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule],
            declarations: [login_page_component_1.LoginPageComponent]
        }).overrideComponent(login_page_component_1.LoginPageComponent, {
            set: {
                providers: [{ provide: login_page_service_1.LoginPageService, useValue: mockLoginPageService },
                    { provide: router_1.ActivatedRoute, useValue: mockActivatedRoute },
                    { provide: router_1.Router, useValue: mockRouter }]
            }
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(login_page_component_1.LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        testPath = 'test_path';
    });
    it('should test the ngOnInit', function () {
        component.ngOnInit();
        expect(component.redirect).toBe(testPath);
        testPath = null;
        component.ngOnInit();
        expect(component.redirect).toBe('/home');
    });
    it('should test the onSubmit', function () {
        component.ngOnInit();
        component.onSubmit();
        expect(localStorage.getItem('myprofile_auth_token')).toBe(testToken);
        expect(resultRedirectUrl).toBe(testPath);
        expect(component.invalidCredentials).toBe(true);
    });
});
