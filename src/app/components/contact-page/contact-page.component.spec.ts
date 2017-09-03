/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from '@angular/router/testing';

import {Account} from "../../models/account";
import {AccountService} from "../../helpers/account.service";
import {ContactPageComponent} from './contact-page.component';
import {ContactPageService} from './contact-page.service'
import {Profile} from "../../models/profile";

describe('ContactPageComponent', () => {
    let component: ContactPageComponent;
    let fixture: ComponentFixture<ContactPageComponent>;
    let mockProfile = new Profile();
    mockProfile.firstName = 'Spencer';
    mockProfile.lastName = 'Hockeborn';
    let mockAccount = new Account();
    mockAccount.email = 'blah@blah.com';

    class MockContactPageService {
        sendMessage() {
            return {
                then: (cb1, cb2) => {
                    cb1();
                    cb2();
                }
            }
        }
    }

    class accountServiceStub {
        getProfile() {
            return {
                then: (cb) => {
                    cb(mockProfile);
                }
            }
        }

        getAccount() {
            return {
                then: (cb) => {
                    cb(mockAccount);
                }
            }
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [ContactPageComponent],
            providers: [
                {provide: AccountService, useClass: accountServiceStub}
            ]
        }).overrideComponent(ContactPageComponent, {
            set: {
                providers: [{provide: ContactPageService, useClass: MockContactPageService}]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test onSubmit', () => {
        component.model.message = 'test';
        component.onSubmit();
        expect(component.emailSuccess).toBe(true);
        expect(component.emailFailed).toBe(true);
        expect(component.model.message).toBeNull();
    });

    it('should test showContactInfo', () => {
        component.emailFailed = true;
        component.emailSuccess = true;
        component.showContactInfo();
        expect(component.emailSuccess).toBe(false);
        expect(component.emailFailed).toBe(false);
    });
});
