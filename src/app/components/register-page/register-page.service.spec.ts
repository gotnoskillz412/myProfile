/* tslint:disable:no-unused-variable */
import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import {AuthService} from "../../helpers/auth.service";
import {Option22Service} from "../../helpers/option22.service";
import {RegisterPageService} from './register-page.service';

describe('RegisterPageService', () => {
    let loggedIn;
    let token;
    class MockHttpService {
        post() {
            return {
                toPromise: () => {
                    return Promise.resolve({
                        json: () => {
                            return {
                                token: 'test_token'
                            }
                        }
                    });
                }
            };
        }
    }

    class MockAuthService {
        loggedIn() {
            return loggedIn;
        }

        removeToken() {
            token = null;
        }

        setToken(t) {
            token = t;
        }

    }

    beforeEach(() => {
        token = null;
        loggedIn = null;
        TestBed.configureTestingModule({
            providers: [
                RegisterPageService,
                {provide: Option22Service, useClass: MockHttpService},
                {provide: AuthService, useClass: MockAuthService}
            ]
        });
    });

    it('should test registerAccount while logged in', inject([RegisterPageService], (service: RegisterPageService) => {
        let accountInfo = {
            username: 'test',
            password: 'test',
            email: 'test'
        };
        token = 'test';
        loggedIn = true;
        service.registerAccount(accountInfo).then(() => {
            expect(token).toBe('test_token');
        });
    }));

    it('should test registerAccount while logged out', fakeAsync(inject([RegisterPageService], (service: RegisterPageService) => {
        let accountInfo = {
            username: 'test',
            password: 'test',
            email: 'test'
        };
        loggedIn = false;
        service.registerAccount(accountInfo);
        tick();
        expect(token).toBe('test_token');
    })));
});
