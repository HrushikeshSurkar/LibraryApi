import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProgressPanel } from './progress-panel';

describe('ProgressPanel', () => {
  let component: ProgressPanel;
  let fixture: ComponentFixture<ProgressPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressPanel],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressPanel);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('completedCount', 0);
    fixture.componentRef.setInput('incompleteCount', 0);
    fixture.componentRef.setInput('totalCount', 0);
    fixture.componentRef.setInput('progressPercentage', 0);
    fixture.componentRef.setInput('donutBackground', 'conic-gradient(#5b5bd6 0deg, #e7e9ee 0deg)');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
