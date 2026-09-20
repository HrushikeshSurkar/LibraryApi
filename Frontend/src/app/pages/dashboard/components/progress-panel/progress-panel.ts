import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-progress-panel',
  templateUrl: './progress-panel.html',
  styleUrl: './progress-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPanel {
  readonly completedCount = input.required<number>();
  readonly incompleteCount = input.required<number>();
  readonly totalCount = input.required<number>();
  readonly progressPercentage = input.required<number>();
  readonly donutBackground = input.required<string>();
}

