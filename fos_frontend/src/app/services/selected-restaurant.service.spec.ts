import { TestBed } from '@angular/core/testing';

import { SelectedRestaurantService } from './selected-restaurant.service';

describe('SelectedRestaurantService', () => {
  let service: SelectedRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
