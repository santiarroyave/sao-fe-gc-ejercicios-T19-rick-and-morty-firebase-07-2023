import { TestBed } from '@angular/core/testing';

import { MisPersonajesService } from './mis-personajes.service';

describe('MisPersonajesService', () => {
  let service: MisPersonajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisPersonajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
