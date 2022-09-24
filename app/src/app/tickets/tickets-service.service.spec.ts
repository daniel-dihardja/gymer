import { TestBed } from '@angular/core/testing';

import { MyTicketsService } from './my-tickets-service.service';

describe('MyTicketsServiceService', () => {
  let service: MyTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
