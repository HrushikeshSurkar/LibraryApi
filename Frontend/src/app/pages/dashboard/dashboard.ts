import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { DashboardService } from './dashboard.service';
import { ProjectTask } from '../../models/project-task';

import { Navbar } from './components/navbar/navbar';
import { ProgressPanel } from './components/progress-panel/progress-panel';
import { TaskForm } from './components/task-form/task-form';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, TaskList, ProgressPanel, TaskForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly dashboardService = inject(DashboardService);

  readonly tasks = this.dashboardService.tasks;

  readonly isFormOpen = signal(false);
  readonly editingTaskId = signal<string | null>(null);
  readonly taskTitle = signal('');

  readonly completedCount = computed(
    () => this.tasks().filter((task) => task.task_completed).length,
  );

  readonly incompleteCount = computed(() => this.tasks().length - this.completedCount());

  readonly progressPercentage = computed(() => {
    const total = this.tasks().length;

    return total === 0 ? 0 : Math.round((this.completedCount() / total) * 100);
  });

  readonly donutBackground = computed(() => {
    const degrees = this.progressPercentage() * 3.6;

    return `conic-gradient(
      #5b5bd6 0deg ${degrees}deg,
      #e7e9ee ${degrees}deg 360deg
    )`;
  });

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.dashboardService.getTasks().subscribe({
      error: (error) => {
        console.error('Failed to load tasks', error);
      },
    });
  }

  openAddForm(): void {
    this.editingTaskId.set(null);
    this.taskTitle.set('');
    this.isFormOpen.set(true);
  }

  openEditForm(task: ProjectTask): void {
    this.editingTaskId.set(task.task_id);
    this.taskTitle.set(task.task_title);
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.editingTaskId.set(null);
    this.taskTitle.set('');
  }

  updateTaskTitle(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.taskTitle.set(input.value);
  }

  saveTask(): void {
    const title = this.taskTitle().trim();

    if (!title) {
      return;
    }

    const editingId = this.editingTaskId();

    if (editingId) {
      this.updateExistingTask(editingId, title);
      return;
    }

    this.addNewTask(title);
  }

  private addNewTask(title: string): void {
    this.dashboardService.addTask(title).subscribe({
      next: (response) => {
        if (response.success) {
          this.closeForm();
        }
      },
      error: (error) => {
        console.error('Failed to add task', error);
      },
    });
  }

  private updateExistingTask(taskId: string, title: string): void {
    const currentTask = this.tasks().find((task) => task.task_id === taskId);

    if (!currentTask) {
      return;
    }

    this.dashboardService.updateTask(taskId, title, currentTask.task_completed).subscribe({
      next: (response) => {
        if (response.success) {
          this.closeForm();
        }
      },
      error: (error) => {
        console.error('Failed to update task', error);
      },
    });
  }

  toggleTask(task: ProjectTask, completed: boolean): void {
    this.dashboardService.updateTask(task.task_id, task.task_title, completed).subscribe({
      error: (error) => {
        console.error('Failed to update task', error);
      },
    });
  }

  deleteTask(taskId: string): void {
    this.dashboardService.deleteTask(taskId).subscribe({
      error: (error) => {
        console.error('Failed to delete task', error);
      },
    });
  }
}

