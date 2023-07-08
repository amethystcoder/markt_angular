import { TestBed } from '@angular/core/testing';

import { ChatApiService } from './chat-api.service';

describe('ChatApiService', () => {
  let service: ChatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
