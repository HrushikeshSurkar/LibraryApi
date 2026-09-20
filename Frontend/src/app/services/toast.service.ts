import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  timerId?: ReturnType<typeof setTimeout> | null;
  startTime?: number;
  remainingMs?: number;
  isPaused?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  public toasts = signal<ToastItem[]>([]);

  public show(message: string, type: ToastType = 'info', title?: string, durationMs: number = 5000): void {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastItem = {
      id,
      type,
      title,
      message,
      remainingMs: durationMs,
      startTime: Date.now(),
      isPaused: false,
    };

    newToast.timerId = setTimeout(() => {
      this.remove(id);
    }, durationMs);

    this.toasts.update((current) => [...current, newToast]);
  }

  public success(message: string, title: string = 'Success'): void {
    this.show(message, 'success', title);
  }

  public error(message: string, title: string = 'Error'): void {
    this.show(message, 'error', title);
  }

  public info(message: string, title: string = 'Information'): void {
    this.show(message, 'info', title);
  }

  public warning(message: string, title: string = 'Warning'): void {
    this.show(message, 'warning', title);
  }

  public pause(id: string): void {
    this.toasts.update((current) =>
      current.map((t) => {
        if (t.id === id && !t.isPaused) {
          if (t.timerId) clearTimeout(t.timerId);
          const elapsed = Date.now() - (t.startTime || Date.now());
          const remaining = Math.max((t.remainingMs || 5000) - elapsed, 1000);
          return { ...t, timerId: null, isPaused: true, remainingMs: remaining };
        }
        return t;
      })
    );
  }

  public resume(id: string): void {
    this.toasts.update((current) =>
      current.map((t) => {
        if (t.id === id && t.isPaused) {
          const duration = t.remainingMs || 5000;
          const timerId = setTimeout(() => {
            this.remove(id);
          }, duration);
          return { ...t, timerId, startTime: Date.now(), isPaused: false };
        }
        return t;
      })
    );
  }

  public remove(id: string): void {
    this.toasts.update((current) => {
      const target = current.find((t) => t.id === id);
      if (target?.timerId) {
        clearTimeout(target.timerId);
      }
      return current.filter((t) => t.id !== id);
    });
  }
}
