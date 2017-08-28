import { TestBed, inject } from '@angular/core/testing';

import { GoalsFormPageResolverService } from './goals-form-page-resolver.service';

describe('GoalsFormPageResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalsFormPageResolverService]
    });
  });

  it('should be created', inject([GoalsFormPageResolverService], (service: GoalsFormPageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
