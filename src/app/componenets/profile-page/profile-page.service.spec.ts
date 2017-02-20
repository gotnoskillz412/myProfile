/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfilePageService } from './profile-page.service';

describe('ProfilePageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilePageService]
    });
  });

  it('should ...', inject([ProfilePageService], (service: ProfilePageService) => {
    expect(service).toBeTruthy();
  }));
});
