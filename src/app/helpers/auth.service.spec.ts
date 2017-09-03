/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';

import {AuthService} from './auth.service';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
    });

    it('should test token handling', inject([AuthService], (service: AuthService) => {
        service.setToken('test_token');
        expect(service.getToken()).toBe('test_token');

        service.removeToken();
        expect(service.getToken()).toBeNull();
    }));

    it('should test loggedIn while not logged in', inject([AuthService], (service: AuthService) => {
        expect(service.loggedIn()).toBe(false);
    }));

    it('should test loggedIn while logged in', inject([AuthService], (service: AuthService) => {
        service.setToken(('test_token'));
        expect(service.loggedIn()).toBe(true);
    }));
});
