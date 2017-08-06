/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {ProfilePageService} from './profile-page.service';
import {Option22Service} from "../../helpers/option22.service";

describe('ProfilePageService', () => {
    let testComplete;

    let mockHttpService = {
        get: () => {
            return {
                toPromise: () => {
                    testComplete = true;
                }
            };
        }
    };

    beforeEach(() => {
        testComplete = false;
        TestBed.configureTestingModule({
            providers: [ProfilePageService, {provide: Option22Service, useValue: mockHttpService}]
        });
    });

});
