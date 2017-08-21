import { TestBed, inject } from '@angular/core/testing';

import { GoalsListPageService } from './goals-list-page.service';

describe('GoalsListPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalsListPageService]
    });
  });

  it('should be created', inject([GoalsListPageService], (service: GoalsListPageService) => {
    expect(service).toBeTruthy();
  }));
});
