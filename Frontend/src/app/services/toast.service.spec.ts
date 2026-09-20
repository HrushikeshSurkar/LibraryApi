import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add toast notification', () => {
    service.success('Test Toast');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Test Toast');
  });

  it('should remove toast notification', () => {
    service.info('To Remove');
    const toastId = service.toasts()[0].id;
    service.remove(toastId);
    expect(service.toasts().length).toBe(0);
  });

  it('should pause and resume toast timer', () => {
    service.warning('Hover Test');
    const toastId = service.toasts()[0].id;
    service.pause(toastId);
    expect(service.toasts()[0].isPaused).toBeTrue();

    service.resume(toastId);
    expect(service.toasts()[0].isPaused).toBeFalse();
  });
});
