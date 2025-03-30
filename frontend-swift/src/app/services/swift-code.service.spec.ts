import { TestBed } from '@angular/core/testing';

import { SwiftCodeService } from './swift-code.service';

describe('SwiftCodeService', () => {
  let service: SwiftCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwiftCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
