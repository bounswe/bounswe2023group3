import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { moderatorAuthorizeGuard } from './moderator-authorize.guard';

describe('moderatorAuthorizeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => moderatorAuthorizeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
