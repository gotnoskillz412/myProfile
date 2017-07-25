/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {LoginPageComponent} from './login-page.component';
import {LoginPageService} from "./login-page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;
    let testPath;
    let testToken = 'test_token';
    let resultRedirectUrl = null;

    let mockLoginPageService = {
        sendLoginCredentials: () => {
            return {
                then: (cb, errCb) => {
                    cb({
                        json: () => {
                            return {
                                token: testToken
                            }
                        }
                    });
                    errCb();
                }
            };
        }
    };

    let mockActivatedRoute = {
        queryParams: {
            subscribe: (cb) => {
                cb({redirect_path: testPath});
            }
        }
    };

    let mockRouter = {
        navigate: (url) => {
            resultRedirectUrl = url[0];
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginPageComponent]
        }).overrideComponent(LoginPageComponent, {
            set: {
                providers: [{provide: LoginPageService, useValue: mockLoginPageService},
                    {provide: ActivatedRoute, useValue: mockActivatedRoute},
                    {provide: Router, useValue: mockRouter}]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        testPath = 'test_path';
    });

    it('should test the ngOnInit', () => {
        component.ngOnInit();
        expect(component.redirect).toBe(testPath);
        testPath = null;
        component.ngOnInit();
        expect(component.redirect).toBe('/home');
    });

    it('should test the onSubmit', () => {
        component.ngOnInit();
        component.onSubmit();
        expect(localStorage.getItem('myprofile_auth_token')).toBe(testToken);
        expect(resultRedirectUrl).toBe(testPath);
        expect(component.invalidCredentials).toBe(true);
    });
});
