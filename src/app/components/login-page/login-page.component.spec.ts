/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {LoginPageComponent} from './login-page.component';
import {LoginPageService} from "./login-page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AccountService} from "../../helpers/account.service";

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;
    let testPicture = 'test_picture';
    let resultRedirectUrl;
    let updatedProfilePicture;

    class MockLoginPageService {
        sendLoginCredentials() {
            return {
                then: (cb, errCb) => {
                    cb({
                        json: () => {
                            return {
                                profile: {
                                    picture: testPicture
                                }
                            }
                        }
                    });
                    errCb();
                }
            };
        }
    }

    class MockAccountService {
        updateProfilePicture(picture) {
            updatedProfilePicture = picture;
        }
    }

    class MockRouter {
        navigate(url) {
            resultRedirectUrl = url[0];
        }
    }



    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginPageComponent],
            providers: [
                {provide: AccountService, useClass: MockAccountService},
                {provide: Router, useClass: MockRouter}
            ]
        }).overrideComponent(LoginPageComponent, {
            set: {
                providers: [{provide: LoginPageService, useClass: MockLoginPageService}]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        updatedProfilePicture = null;
        resultRedirectUrl = null;
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
    });

    it('should test the ngOnInit', () => {
        component.ngOnInit();
        expect(component.invalidCredentials).toBe(false);
    });

    it('should test the onSubmit with profile picture', () => {
        component.onSubmit();
        expect(updatedProfilePicture).toBe(testPicture);
        expect(resultRedirectUrl).toBe('/goals');
        expect(component.invalidCredentials).toBe(true);
    });

    it('should test the onSubmit without profile picture', () => {
        testPicture = null;
        component.onSubmit();
        expect(updatedProfilePicture).toBe(null);
        expect(resultRedirectUrl).toBe('/goals');
        expect(component.invalidCredentials).toBe(true);
    });
});
