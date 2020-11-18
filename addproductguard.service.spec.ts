import { TestBed } from '@angular/core/testing';

import { AddproductguardService } from './addproduct-load-guard.service';

describe('AddproductguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create Add Product Guard Service', () => {
    const service: AddproductguardService = TestBed.get(AddproductguardService);
    expect(service).toBeTruthy();
  });
});
