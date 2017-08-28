import { TestBed, inject } from '@angular/core/testing';

import { GoalsListPageResolverService } from './goals-list-page-resolver.service';

describe('GoalsListPageResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalsListPageResolverService]
    });
  });

  it('should be created', inject([GoalsListPageResolverService], (service: GoalsListPageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
