import { TestBed } from '@angular/core/testing';

import { SignupandloginService } from './signupandlogin.service';

describe('SignupandloginService', () => {
  let service: SignupandloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupandloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
