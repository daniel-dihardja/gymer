import { TestBed } from '@angular/core/testing';

import { MyTicketsServiceService } from './my-tickets-service.service';

describe('MyTicketsServiceService', () => {
  let service: MyTicketsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTicketsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
