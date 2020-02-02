import { TestBed } from '@angular/core/testing';

import { EncuestaServiceService } from './encuesta-service.service';

describe('EncuestaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncuestaServiceService = TestBed.get(EncuestaServiceService);
    expect(service).toBeTruthy();
  });
});
