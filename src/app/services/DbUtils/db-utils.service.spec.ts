import { TestBed } from '@angular/core/testing';

import { DbUtilsService } from './db-utils.service';

describe('DbUtilsService', () => {
  let service: DbUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
