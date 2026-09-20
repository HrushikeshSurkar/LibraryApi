import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { ToastService, ToastItem } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainer {
  protected readonly toastService = inject(ToastService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected readonly toasts = this.toastService.toasts;

  constructor() {
    effect(() => {
      this.toasts();
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  protected onMouseEnter(toast: ToastItem): void {
    this.toastService.pause(toast.id);
  }

  protected onMouseLeave(toast: ToastItem): void {
    this.toastService.resume(toast.id);
  }

  protected closeToast(id: string): void {
    this.toastService.remove(id);
  }
}
