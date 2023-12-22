import { TestBed } from '@angular/core/testing';

import { FigmaServiceService } from './figma-service.service';

describe('FigmaServiceService', () => {
  let service: FigmaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FigmaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
