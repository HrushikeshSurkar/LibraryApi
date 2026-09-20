import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequestIds = signal<Set<string>>(new Set());
  public isLoading = computed(() => this.activeRequestIds().size > 0);
  private requestTimers = new Map<string, any>();

  public show(requestId: string = 'default'): void {
    this.activeRequestIds.update((set) => {
      const newSet = new Set(set);
      newSet.add(requestId);
      return newSet;
    });

    // Clear any existing timer for this request
    if (this.requestTimers.has(requestId)) {
      clearTimeout(this.requestTimers.get(requestId));
    }

    // Safety timeout: Auto-release request after 3.5 seconds maximum so loader NEVER hangs
    const timer = setTimeout(() => {
      this.hide(requestId);
    }, 3500);

    this.requestTimers.set(requestId, timer);
  }

  public hide(requestId: string = 'default'): void {
    if (this.requestTimers.has(requestId)) {
      clearTimeout(this.requestTimers.get(requestId));
      this.requestTimers.delete(requestId);
    }

    this.activeRequestIds.update((set) => {
      if (!set.has(requestId)) return set;
      const newSet = new Set(set);
      newSet.delete(requestId);
      return newSet;
    });
  }

  public reset(): void {
    this.requestTimers.forEach((timer) => clearTimeout(timer));
    this.requestTimers.clear();
    this.activeRequestIds.set(new Set());
  }
}
