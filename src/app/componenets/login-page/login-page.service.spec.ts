/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginPageService } from './login-page.service';

describe('LoginPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginPageService]
    });
  });

  it('should ...', inject([LoginPageService], (service: LoginPageService) => {
    expect(service).toBeTruthy();
  }));
});
