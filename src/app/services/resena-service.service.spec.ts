import { TestBed } from '@angular/core/testing';

import { ResenaServiceService } from './resena-service.service';

describe('ResenaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResenaServiceService = TestBed.get(ResenaServiceService);
    expect(service).toBeTruthy();
  });
});
