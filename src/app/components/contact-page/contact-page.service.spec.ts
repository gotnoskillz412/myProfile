/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';

import {ContactPageService} from './contact-page.service';
import {Option22Service} from "../../helpers/option22.service";

describe('ContactPageService', () => {
    let mockHttpService = {
        post: (url, emailInfo) => {
            return {
                toPromise: () => {
                    return {
                        then: (cb) => {
                            return Promise.resolve(cb(emailInfo));
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
        service.sendMessage(emailInfo).then((response) => {
            expect(response.name).toBe(emailInfo.name);
            expect(response.email).toBe(emailInfo.email);
            expect(response.message).toBe(emailInfo.message);
        });
    }));
});
