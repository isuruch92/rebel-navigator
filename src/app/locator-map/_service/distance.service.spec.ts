import { TestBed } from '@angular/core/testing';

import { DistanceService } from './distance.service';

describe('DistanceService', () => {
  let service: DistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
