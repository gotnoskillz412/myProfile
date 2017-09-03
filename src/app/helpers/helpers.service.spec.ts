/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';

import {Account} from "../models/account";
import {AccountService} from "./account.service";
import {HelpersService} from './helpers.service';

describe('HelpersService', () => {
    let mockAccount;
    class MockAccountService {
        getAccount() {
            return Promise.resolve(mockAccount);
        }
    }

    beforeEach(() => {
        mockAccount = null;
        TestBed.configureTestingModule({
            providers: [HelpersService,
                {provide: AccountService, useClass: MockAccountService}
            ]
        });
    });

    it('should get AuthUri with account', inject([HelpersService], (service: HelpersService) => {
        mockAccount = new Account();
        mockAccount._id = 'test';
        service.getAuthUri().then((resp) => {
            expect(resp).toBe('http://localhost:3000/accounts/test');
        });
    }));

    it('should get AuthUri with no account', inject([HelpersService], (service: HelpersService) => {
        service.getAuthUri().then((resp) => {
            expect(resp).toBeNull();
        });
    }));
});
