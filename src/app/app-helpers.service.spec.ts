import {TestBed, inject} from '@angular/core/testing';

import {AppHelpersService} from './app-helpers.service';

describe('AppHelpersService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AppHelpersService]
        });
    });

    it('should be created', inject([AppHelpersService], (service: AppHelpersService) => {
        expect(service).toBeTruthy();
    }));
});
