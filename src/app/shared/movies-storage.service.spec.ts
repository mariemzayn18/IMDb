import { TestBed } from '@angular/core/testing';

import { MoviesStorageService } from './movies-storage.service';

describe('MoviesStorageService', () => {
  let service: MoviesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
