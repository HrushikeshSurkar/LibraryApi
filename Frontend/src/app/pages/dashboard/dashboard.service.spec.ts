import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ProjectTask } from '../../models/project-task';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  const mockTasks: ProjectTask[] = [
    { task_id: '1', task_title: 'Task 1', task_completed: false },
    { task_id: '2', task_title: 'Task 2', task_completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        DashboardService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks and update signal', () => {
    service.getTasks().subscribe((response) => {
      expect(response.success).toBeTrue();
      expect(response.data.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:5147/api/ProjectTasks');
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, data: mockTasks, message: 'Loaded' });

    expect(service.tasks()).toEqual(mockTasks);
  });

  it('should add task and append to signal', () => {
    const newTask: ProjectTask = { task_id: '3', task_title: 'Task 3', task_completed: false };

    service.addTask('Task 3').subscribe((response) => {
      expect(response.success).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:5147/api/ProjectTasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ task_title: 'Task 3', task_completed: false });
    req.flush({ success: true, data: newTask, message: 'Added' });

    expect(service.tasks()).toContain(newTask);
  });

  it('should update task and reflect changes in signal', () => {
    service.tasks.set(mockTasks);
    const updatedTask: ProjectTask = { task_id: '1', task_title: 'Task 1 Updated', task_completed: true };

    service.updateTask('1', 'Task 1 Updated', true).subscribe((response) => {
      expect(response.success).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:5147/api/ProjectTasks/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true, data: updatedTask, message: 'Updated' });

    const taskInSignal = service.tasks().find((t) => t.task_id === '1');
    expect(taskInSignal?.task_title).toBe('Task 1 Updated');
    expect(taskInSignal?.task_completed).toBeTrue();
  });

  it('should delete task and remove from signal', () => {
    service.tasks.set(mockTasks);

    service.deleteTask('1').subscribe((response) => {
      expect(response.success).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:5147/api/ProjectTasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true, data: null, message: 'Deleted' });

    expect(service.tasks().find((t) => t.task_id === '1')).toBeUndefined();
    expect(service.tasks().length).toBe(1);
  });
});
