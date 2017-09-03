/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';

import {Account} from "../../models/account";
import {AccountService} from "../../helpers/account.service";
import {AuthService} from "../../helpers/auth.service";
import {HelpersService} from "../../helpers/helpers.service";
import {Option22Service} from "../../helpers/option22.service";
import {Profile} from "../../models/profile";
import {ProfilePageService} from './profile-page.service';

describe('ProfilePageService', () => {
    let updatePicture;
    let tokenSet;
    let mockAccount = new Account();
    mockAccount.username = 'test_username';

    class MockHttpService {
        put() {
            return {
                toPromise: () => {
                    return {
                        then: (cb) => {
                            let result = {
                                json: () => {
                                    return {
                                        picture: 'test_picture',
                                        account: mockAccount,
                                        token: 'test_token'
                                    };
                                }
                            };
                            return Promise.resolve(cb(result))
                        }
                    }
                }
            };
        }
    }

    class MockHelpersService {
        getAuthUri() {
            return {
                then: (cb) => {
                    return cb('authuri');
                }
            }
        }
    }

    class MockAccountService {
        updateProfilePicture() {
            updatePicture = true;
        }
    }

    class MockAuthService {
        setToken() {
            tokenSet = true;
        }
    }


    beforeEach(() => {
        updatePicture = null;
        tokenSet = false;
        TestBed.configureTestingModule({
            providers: [ProfilePageService,
                {provide: Option22Service, useClass: MockHttpService},
                {provide: HelpersService, useClass: MockHelpersService},
                {provide: AccountService, useClass: MockAccountService},
                {provide: AuthService, useClass: MockAuthService}
            ]
        });
    });

    it('should test the updateProfile', inject([ProfilePageService], (service: ProfilePageService) => {
        let testProfile = new Profile();
        testProfile._id = 'test';
        service.updateProfile(testProfile).then((resp) => {
            expect(resp.picture).toBe('test_picture');
            expect(updatePicture).toBe(true);
        })
    }));

    it('should test the updatePassword', inject([ProfilePageService], (service: ProfilePageService) => {
        let passwords = {
            currentPassword: 'current',
            newPassword: 'new'
        };

        service.updatePassword(passwords, 'test').then((resp) => {
            expect(resp.username).toBe('test_username');
            expect(tokenSet).toBe(true);
        })
    }));

    it('should test the updatePassword', inject([ProfilePageService], (service: ProfilePageService) => {

        service.updateAccount(mockAccount).then((resp) => {
            expect(resp.username).toBe('test_username');
            expect(tokenSet).toBe(true);
        })
    }));
});
