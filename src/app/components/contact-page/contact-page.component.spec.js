"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/router/testing');
var contact_page_component_1 = require('./contact-page.component');
var contact_page_service_1 = require('./contact-page.service');
var forms_1 = require("@angular/forms");
describe('ContactPageComponent', function () {
    var component;
    var fixture;
    var contactPageServiceStub = {
        sendMessage: function () {
            return {
                then: function (cb1, cb2) {
                    cb1();
                    cb2();
                }
            };
        }
    };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, testing_2.RouterTestingModule],
            declarations: [contact_page_component_1.ContactPageComponent]
        }).overrideComponent(contact_page_component_1.ContactPageComponent, {
            set: {
                providers: [{ provide: contact_page_service_1.ContactPageService, useValue: contactPageServiceStub }]
            }
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(contact_page_component_1.ContactPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should test onSubmit', function () {
        component.model.email = 'test';
        component.onSubmit();
        expect(component.emailSuccess).toBe(true);
        expect(component.emailFailed).toBe(true);
        expect(component.model.email).toBeNull();
    });
    it('should test showContactInfo', function () {
        component.emailFailed = true;
        component.emailSuccess = true;
        component.showContactInfo();
        expect(component.emailSuccess).toBe(false);
        expect(component.emailFailed).toBe(false);
    });
});
