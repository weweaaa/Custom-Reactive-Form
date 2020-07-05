import { TestBed } from '@angular/core/testing';

import { LibsService } from './libs.service';

describe('LibsService', () => {
  let service: LibsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
