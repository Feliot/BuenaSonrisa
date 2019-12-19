import { TestBed } from '@angular/core/testing';

import { UserColServiceService } from './user-col-service.service';

describe('UserColServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserColServiceService = TestBed.get(UserColServiceService);
    expect(service).toBeTruthy();
  });
});
