import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProjectTask } from '../../models/project-task';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:5147/api/ProjectTasks';

  readonly tasks = signal<ProjectTask[]>([]);

  getTasks(): Observable<ApiResponse<ProjectTask[]>> {
    return this.http
      .get<ApiResponse<ProjectTask[]>>(this.apiUrl)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.tasks.set(response.data);
          }
        }),
      );
  }

  addTask(title: string): Observable<ApiResponse<ProjectTask>> {
    return this.http
      .post<ApiResponse<ProjectTask>>(this.apiUrl, {
        task_title: title,
        task_completed: false,
      })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.tasks.update((tasks) => [...tasks, response.data]);
          }
        }),
      );
  }

  updateTask(taskId: string, title: string, completed: boolean): Observable<ApiResponse<ProjectTask>> {
    return this.http
      .put<ApiResponse<ProjectTask>>(`${this.apiUrl}/${taskId}`, {
        task_id: taskId,
        task_title: title,
        task_completed: completed,
      })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.tasks.update((tasks) =>
              tasks.map((task) => (task.task_id === taskId ? response.data : task)),
            );
          }
        }),
      );
  }

  deleteTask(taskId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${taskId}`).pipe(
      tap((response) => {
        if (response.success) {
          this.tasks.update((tasks) => tasks.filter((task) => task.task_id !== taskId));
        }
      }),
    );
  }
}

