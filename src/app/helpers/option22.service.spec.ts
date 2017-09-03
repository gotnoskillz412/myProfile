/* tslint:disable:no-unused-variable */
import {HttpModule, XHRBackend} from "@angular/http";
import {inject, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";

import {NotificationsService} from "angular2-notifications/dist";

import {AuthService} from "./auth.service";
import {Option22Service} from "./option22.service";

describe('Option22Service', () => {
    let tokenRemoved;
    let notificationError;
    let redirectedUrl;
    class MockAuthService {
        getToken() {
            return 'test_token';
        }

        removeToken() {
            tokenRemoved = true;
        }
    }

    class MockNotificationsService {
        error() {
            notificationError = true;
        }
    }

    class MockRouter {
        navigate(url) {
            redirectedUrl = url[0];
        }
    }

    beforeEach(() => {
        tokenRemoved = null;
        redirectedUrl = null;
        notificationError = null;
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [Option22Service, XHRBackend,
                {provide: AuthService, useClass: MockAuthService},
                {provide: NotificationsService, useClass: MockNotificationsService},
                {provide: Router, useClass: MockRouter}
            ]
        });
    });

    it('should test the request function', inject([Option22Service], (service: Option22Service) => {
        let eventCaught = false;
        service.httpRequest$.subscribe(() => {
            eventCaught = true;
        });

        service.get('test').toPromise().then(() => {
        }).catch(() => {
            expect(eventCaught).toBe(true);
        })
    }));
});
