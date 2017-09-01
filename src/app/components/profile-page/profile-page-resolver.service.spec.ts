import {inject, TestBed} from "@angular/core/testing";
import {ProfilePageResolverService} from "./profile-page-resolver.service";
import {AccountService} from "../../helpers/account.service";

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
