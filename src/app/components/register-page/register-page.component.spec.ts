/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {RegisterPageComponent} from './register-page.component';
import {RegisterPageService} from "./register-page.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

describe('RegisterPageComponent', () => {
    let component: RegisterPageComponent;
    let fixture: ComponentFixture<RegisterPageComponent>;
    let resultUrl;
    let testToken = 'test_token';
    let testErrorStatus = 400;
    let testErrorMessage = 'test_error_message email'

    let mockRegisterPageService = {
        registerAccount: () => {
            return {
                then: (cb, errCb) => {
                    cb({
                        json: () => {
                            return {
                                token: testToken
                            }
                        }
                    });

                    errCb({
                        status: testErrorStatus,
                        json: () => {
                            return {
                                message: testErrorMessage
                            };
                        }
                    });
                }
            };
        }
    };

    let mockRouter = {
        navigate: (url) => {
            resultUrl = url[0];
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [RegisterPageComponent]
        }).overrideComponent(RegisterPageComponent, {
            set: {
                providers: [{provide: RegisterPageService, useValue: mockRegisterPageService},
                    {provide: Router, useValue: mockRouter}]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        resultUrl = null;
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test onSubmit', () => {
        component.onSubmit();
        expect(localStorage.getItem('myprofile_auth_token')).toBe(testToken);
        expect(resultUrl).toBe('/home');
        testErrorMessage = 'username';
        component.onSubmit();
    });
});
