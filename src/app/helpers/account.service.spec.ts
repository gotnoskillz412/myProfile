import {TestBed, inject} from '@angular/core/testing';

import {AccountService} from './account.service';
import {Option22Service} from "./option22.service";

describe('AccountService', () => {

    class MockHttpService {
        get() {
            return {
                toPromise: () => {
                    let result = {
                        json: () => {
                            return {
                                account: 'account',
                                profile: 'profile'
                            }
                        }
                    };
                    return Promise.resolve(result);
                }
            }
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AccountService,
                {provide: Option22Service, useClass: MockHttpService}
            ]
        });
    });

    it('should test subscribe and update', inject([AccountService], (service: AccountService) => {
        let profilePicture = null;
        service.subscribeToProfilePictureUpdate((profilePic) => {
            profilePicture = profilePic;
        });
        service.updateProfilePicture('test');
        expect(profilePicture).toBe('test');
    }));

    it('should test getAccount', inject([AccountService], (service: AccountService) => {
        service.getAccount().then((resp) => {
            expect(resp).toBe('account');
        });
    }));

    it('should test getProfile', inject([AccountService], (service: AccountService) => {
        service.getAccount().then((resp) => {
            expect(resp).toBe('profile');
        });
    }));
});
