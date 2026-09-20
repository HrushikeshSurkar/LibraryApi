import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskForm {
  taskTitle = input.required<string>();
  readonly editingTaskId = input<string | null>(null);

  taskTitleChange = output<Event>();
  close = output<void>();
  save = output<void>();

  updateTaskTitle(event: Event): void {
    this.taskTitleChange.emit(event);
  }

  closeForm(): void {
    this.close.emit();
  }

  saveTask(): void {
    this.save.emit();
  }
}

