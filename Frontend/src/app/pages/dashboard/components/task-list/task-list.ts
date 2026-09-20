import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProjectTask } from '../../../../models/project-task';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList {
  readonly tasks = input.required<ProjectTask[]>();

  readonly completedCount = input.required<number>();

  readonly progressPercentage = input.required<number>();

  readonly addTask = output<void>();

  readonly editTask = output<ProjectTask>();

  readonly toggleTask = output<{
    task: ProjectTask;
    completed: boolean;
  }>();

  readonly deleteTask = output<string>();

  onAddTask(): void {
    this.addTask.emit();
  }

  onEditTask(task: ProjectTask): void {
    this.editTask.emit(task);
  }

  onToggleTask(task: ProjectTask, completed: boolean): void {
    this.toggleTask.emit({
      task,
      completed,
    });
  }

  onDeleteTask(taskId: string): void {
    this.deleteTask.emit(taskId);
  }
}

