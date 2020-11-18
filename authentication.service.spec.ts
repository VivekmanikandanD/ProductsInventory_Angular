import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule,MatSnackBarModule],
  }));

  it('should create Authentication Service', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
