/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';

import {AuthService} from "../../helpers/auth.service";
import {LoginPageService} from './login-page.service';
import {Option22Service} from "../../helpers/option22.service";

describe('LoginPageService', () => {
    let loggedIn;
    let tokenRemoved;
    let token;
    class MockHttpService {
        post() {
            return {
                toPromise: () => {
                    return {
                        then: (cb) => {
                            let result = cb({
                                json: () => {
                                    return {
                                        token: 'test_token'
                                    }
                                }
                            });
                            return Promise.resolve(result);
                        }
                    };
                }
            };
        }
    }

    class MockAuthService {
        loggedIn() {
            return loggedIn;
        }
        removeToken() {
            tokenRemoved = true;
        }
        setToken(t) {
            token = t;
        }
    }

    beforeEach(() => {
        loggedIn = null;
        tokenRemoved = null;
        token = null;
        TestBed.configureTestingModule({
            providers: [LoginPageService,
                {provide: Option22Service, useClass: MockHttpService},
                {provide: AuthService, useClass: MockAuthService}
            ]
        });
    });

    it('should test the send Login Credentials while logged in', inject([LoginPageService], (service: LoginPageService) => {
        let creds = {
            username: 'test',
            password: 'test'
        };
        loggedIn = true;
        service.sendLoginCredentials(creds).then(() => {
            expect(tokenRemoved).toBe(true);
            expect(token).toBe('test_token');
        });
    }));

    it('should test the send Login Credentials while logged out', inject([LoginPageService], (service: LoginPageService) => {
        let creds = {
            username: 'test',
            password: 'test'
        };
        loggedIn = false;
        service.sendLoginCredentials(creds).then(() => {
            expect(tokenRemoved).toBeNull();
            expect(token).toBe('test_token');
        });
    }));
});
