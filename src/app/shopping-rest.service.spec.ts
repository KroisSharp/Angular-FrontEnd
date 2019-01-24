import { TestBed } from '@angular/core/testing';

import { ShoppingRESTService } from './shopping-rest.service';

describe('ShoppingRESTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingRESTService = TestBed.get(ShoppingRESTService);
    expect(service).toBeTruthy();
  });
});
