/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {ContactPageService} from './contact-page.service';
import {Option22Service} from "../../helpers/option22.service";

describe('ContactPageService', () => {
    let requestHappeningResult = false;
    let requestFinishedResult = false;

    let mockHttpService = {
        requestHappening: () => {
            requestHappeningResult = true;
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
            providers: [ContactPageService, {provide: Option22Service, useValue: mockHttpService}]
        });
    });

    it('should test the send message function', inject([ContactPageService], (service: ContactPageService) => {
        let emailInfo = {
            name: 'testName',
            email: 'testEmail@test.com',
            message: 'This is a test'
        };
        service.sendMessage(emailInfo);
        expect(requestHappeningResult).toBe(true);
        expect(requestFinishedResult).toBe(true);
    }));
});
