/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfilePageService } from './profile-page.service';
import {AppHttpService} from "../../app-http.service";

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
      providers: [ProfilePageService, {provide: AppHttpService, useValue: mockHttpService}]
    });
  });

  it('should test testCredentials', inject([ProfilePageService], (service: ProfilePageService) => {
    service.testCredentials();
    expect(testComplete).toBe(true);
  }));
});
