import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Dashboard } from './dashboard';
import { DashboardService } from './dashboard.service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideZonelessChangeDetection(),
        DashboardService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load tasks', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('http://localhost:5147/api/ProjectTasks');
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, data: [], message: 'Loaded' });

    expect(component).toBeTruthy();
  });

  it('should calculate computed progress metrics correctly', () => {
    fixture.detectChanges();
    const getReq = httpMock.expectOne('http://localhost:5147/api/ProjectTasks');
    getReq.flush({
      success: true,
      data: [
        { task_id: '1', task_title: 'Task 1', task_completed: true },
        { task_id: '2', task_title: 'Task 2', task_completed: false },
      ],
      message: 'Loaded',
    });

    expect(component.completedCount()).toBe(1);
    expect(component.incompleteCount()).toBe(1);
    expect(component.progressPercentage()).toBe(50);
  });
});
