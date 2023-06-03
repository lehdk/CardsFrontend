import { TestBed } from '@angular/core/testing';

import { SignalrLobbyService } from './signalr-lobby.service';

describe('SignalrLobbyService', () => {
  let service: SignalrLobbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrLobbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
