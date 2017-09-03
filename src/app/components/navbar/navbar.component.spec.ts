/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from "@angular/router";

import {AccountService} from "../../helpers/account.service";
import {AuthService} from "../../helpers/auth.service";
import {NavbarComponent} from './navbar.component';
import {Option22Service} from "../../helpers/option22.service";

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let loggedIn;
    let redirectedUrl;
    let pictureUpdated;
    let loggedOut;
    let tokenRemoved;

    class MockRouter {
        navigate(url) {
            redirectedUrl = url[0];
        }
    }

    class MockAuthService {
        loggedIn() {
            return loggedIn;
        }

        removeToken() {
            tokenRemoved = true;
        }
    }

    class MockAccountService {
        updateProfilePicture() {
            pictureUpdated = true;
        }

        subscribeToProfilePictureUpdate(cb) {
            cb('test_picture');
        }

        getProfile() {
            return {
                then: (cb) => {
                    cb({
                        picture: 'test_picture'
                    })
                }
            }
        }

        logout() {
            loggedOut = true;
        }
    }

    class MockHttpService {
        get() {
            return {
                toPromise: () => {
                    return {
                        then: (cb) => {
                            cb();
                        }
                    }
                }
            }
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            providers: [
                {provide: Option22Service, useClass: MockHttpService},
                {provide: Router, useClass: MockRouter},
                {provide: AccountService, useClass: MockAccountService},
                {provide: AuthService, useClass: MockAuthService},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        loggedOut = null;
        loggedIn = null;
        redirectedUrl = null;
        tokenRemoved = null;
        pictureUpdated = null;
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test the ngOnInit function, not logged In', () => {
        loggedIn = false;
        component.ngOnInit();
        expect(component.profilePicture).toBe('test_picture')
    });

    it('should test the ngOnInit function, logged In', () => {
        loggedIn = true;
        component.ngOnInit();
        expect(component.profilePicture).toBe('test_picture')
    });

    it('should test the loggedIn function', () => {
        loggedIn = true;
        expect(component.loggedIn()).toBe(true);
    });

    it('should test the logout function', () => {
        component.logout();
        expect(loggedOut).toBe(true);
        expect(redirectedUrl).toBe('/home');
        expect(pictureUpdated).toBe(true);
        expect(tokenRemoved).toBe(true);
    });
});
