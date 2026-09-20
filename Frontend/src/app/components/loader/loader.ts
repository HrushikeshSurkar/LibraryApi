import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  private readonly loadingService = inject(LoadingService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected readonly isLoading = this.loadingService.isLoading;

  constructor() {
    effect(() => {
      // Force immediate DOM update whenever isLoading signal state changes
      this.isLoading();
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }
}
