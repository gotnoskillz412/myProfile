/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {ContactPageComponent} from './contact-page.component';
import {ContactPageService} from './contact-page.service'
import {FormsModule} from "@angular/forms";

describe('ContactPageComponent', () => {
    let component: ContactPageComponent;
    let fixture: ComponentFixture<ContactPageComponent>;

    let contactPageServiceStub = {
        sendMessage: () => {
            return {
                then: (cb1, cb2) => {
                    cb1();
                    cb2();
                }
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [ContactPageComponent]
        }).overrideComponent(ContactPageComponent, {
            set: {
                providers: [{provide: ContactPageService, useValue: contactPageServiceStub}]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test onSubmit', () => {
        component.model.email = 'test';
        component.onSubmit();
        expect(component.emailSuccess).toBe(true);
        expect(component.emailFailed).toBe(true);
        expect(component.model.email).toBeNull();
    });

    it('should test showContactInfo', () => {
        component.emailFailed = true;
        component.emailSuccess = true;
        component.showContactInfo();
        expect(component.emailSuccess).toBe(false);
        expect(component.emailFailed).toBe(false);
    });
});
