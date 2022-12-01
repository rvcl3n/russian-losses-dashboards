import { TestBed } from '@angular/core/testing';

import { RestLossesService } from './rest-losses.service';

describe('RestLossesService', () => {
  let service: RestLossesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestLossesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
