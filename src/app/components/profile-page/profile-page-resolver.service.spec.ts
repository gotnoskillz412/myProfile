/* tslint:disable:no-unused-variable */
import {inject, TestBed} from "@angular/core/testing";

import {AccountService} from "../../helpers/account.service";
import {ProfilePageResolverService} from "./profile-page-resolver.service";

describe('ProfilePageResolverService', () => {

    class MockAccountService {
        getProfile() {
            return Promise.resolve('test');
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProfilePageResolverService,
                {provide: AccountService, useClass: MockAccountService}
            ]
        });
    });

    it('should test resolve', inject([ProfilePageResolverService], (service: ProfilePageResolverService) => {
        service.resolve(null, null).then((resp) => {
            expect(resp).toBe('test');
        });
    }));
});
