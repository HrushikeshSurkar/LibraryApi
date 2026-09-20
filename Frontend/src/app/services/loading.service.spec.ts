import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(LoadingService);
    service.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle isLoading based on show and hide calls with request IDs', () => {
    expect(service.isLoading()).toBeFalse();

    service.show('req-1');
    expect(service.isLoading()).toBeTrue();

    service.hide('req-1');
    expect(service.isLoading()).toBeFalse();
  });

  it('should handle multiple requests simultaneously', () => {
    service.show('req-1');
    service.show('req-2');
    expect(service.isLoading()).toBeTrue();

    service.hide('req-1');
    expect(service.isLoading()).toBeTrue();

    service.hide('req-2');
    expect(service.isLoading()).toBeFalse();
  });
});
