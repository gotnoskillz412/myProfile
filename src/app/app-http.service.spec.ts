/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppHttpService } from './app-http.service';

describe('HttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppHttpService]
    });
  });

  it('should ...', inject([AppHttpService], (service: AppHttpService) => {
    expect(service).toBeTruthy();
  }));
});
