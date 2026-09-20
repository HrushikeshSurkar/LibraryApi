import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectTask } from '../models/project-task';

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectTaskService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:5147/api/ProjectTasks';

  getTasks(): Observable<ApiResponse<ProjectTask[]>> {
    return this.http.get<ApiResponse<ProjectTask[]>>(this.apiUrl);
  }

  addTask(task: ProjectTask): Observable<ApiResponse<ProjectTask>> {
    return this.http.post<ApiResponse<ProjectTask>>(this.apiUrl, task);
  }

  updateTask(task: ProjectTask): Observable<ApiResponse<ProjectTask>> {
    return this.http.put<ApiResponse<ProjectTask>>(`${this.apiUrl}/${task.task_id}`, task);
  }

  deleteTask(taskId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${taskId}`);
  }
}
