"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var account_1 = require("../../models/account");
var account_service_1 = require("../../helpers/account.service");
var contact_page_component_1 = require("./contact-page.component");
var contact_page_service_1 = require("./contact-page.service");
var profile_1 = require("../../models/profile");
describe('ContactPageComponent', function () {
    var component;
    var fixture;
    var mockProfile = new profile_1.Profile();
    mockProfile.firstName = 'Spencer';
    mockProfile.lastName = 'Hockeborn';
    var mockAccount = new account_1.Account();
    mockAccount.email = 'blah@blah.com';
    var MockContactPageService = (function () {
        function MockContactPageService() {
        }
        MockContactPageService.prototype.sendMessage = function () {
            return {
                then: function (cb1, cb2) {
                    cb1();
                    cb2();
                }
            };
        };
        return MockContactPageService;
    }());
    var accountServiceStub = (function () {
        function accountServiceStub() {
        }
        accountServiceStub.prototype.getProfile = function () {
            return {
                then: function (cb) {
                    cb(mockProfile);
                }
            };
        };
        accountServiceStub.prototype.getAccount = function () {
            return {
                then: function (cb) {
                    cb(mockAccount);
                }
            };
        };
        return accountServiceStub;
    }());
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, testing_2.RouterTestingModule],
            declarations: [contact_page_component_1.ContactPageComponent],
            providers: [
                { provide: account_service_1.AccountService, useClass: accountServiceStub }
            ]
        }).overrideComponent(contact_page_component_1.ContactPageComponent, {
            set: {
                providers: [{ provide: contact_page_service_1.ContactPageService, useClass: MockContactPageService }]
            }
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(contact_page_component_1.ContactPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test onSubmit', function () {
        component.model.message = 'test';
        component.onSubmit();
        expect(component.emailSuccess).toBe(true);
        expect(component.emailFailed).toBe(true);
        expect(component.model.message).toBeNull();
    });
    it('should test showContactInfo', function () {
        component.emailFailed = true;
        component.emailSuccess = true;
        component.showContactInfo();
        expect(component.emailSuccess).toBe(false);
        expect(component.emailFailed).toBe(false);
    });
});
