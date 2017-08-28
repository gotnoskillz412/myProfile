/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {LoginPageService} from './login-page.service';
import {Option22Service} from "../../helpers/option22.service";

describe('LoginPageService', () => {
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
        testFinished = false;
        TestBed.configureTestingModule({
            providers: [LoginPageService, {provide: Option22Service, useValue: mockHttpService}]
        });
    });

    it('should ...', inject([LoginPageService], (service: LoginPageService) => {
        let creds = {
            username: 'test',
            password: 'test'
        };
        service.sendLoginCredentials(creds);
        expect(testFinished).toBe(true);
    }));
});
