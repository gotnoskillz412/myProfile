/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {RegisterPageService} from './register-page.service';
import {AppHttpService} from "../../app-http.service";

describe('RegisterPageService', () => {
    let testFinished;
    let mockHttpService = {
        post: () => {
            return {
                toPromise: () => {
                    testFinished = true;
                }
            };
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RegisterPageService, {provide: AppHttpService, useValue: mockHttpService}]
        });
    });

    it('should test registerAccount', inject([RegisterPageService], (service: RegisterPageService) => {
        let accountInfo = {
            username: 'test',
            password: 'test',
            email: 'test'
        };
        service.registerAccount(accountInfo);
        expect(testFinished).toBe(true);
    }));
});
