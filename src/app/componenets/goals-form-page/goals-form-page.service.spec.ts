import { TestBed, inject } from '@angular/core/testing';

import { GoalsFormPageService } from './goals-form-page.service';

describe('GoalsFormPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalsFormPageService]
    });
  });

  it('should be created', inject([GoalsFormPageService], (service: GoalsFormPageService) => {
    expect(service).toBeTruthy();
  }));
});
