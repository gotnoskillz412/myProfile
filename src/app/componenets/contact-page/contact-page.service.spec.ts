/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {ContactPageService} from './contact-page.service';
import {AppHttpService} from "../../app-http.service";

describe('ContactPageService', () => {
    let requestHapeningResult = false;
    let requestFinishedResult = false;

    let mockHttpService = {
        requestHappening: () => {
            requestHapeningResult = true;
        },
        requestFinished: () => {
            requestFinishedResult = true;
        },
        post: () => {
            return {
                toPromise: () => {
                    return {
                        then: (cb) => {
                            cb();
                        }
                    };
                }
            };
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ContactPageService, {provide: AppHttpService, useValue: mockHttpService}]
        });
    });

    it('should test the send message function', inject([ContactPageService], (service: ContactPageService) => {
        let emailInfo = {
            name: 'testName',
            email: 'testEmail@test.com',
            message: 'This is a test'
        };
        service.sendMessage(emailInfo);
        expect(requestHapeningResult).toBe(true);
        expect(requestFinishedResult).toBe(true);
    }));
});
