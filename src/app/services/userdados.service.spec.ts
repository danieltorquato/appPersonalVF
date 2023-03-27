import { TestBed } from '@angular/core/testing';

import { UserdadosService } from './userdados.service';

describe('UserdadosService', () => {
  let service: UserdadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
