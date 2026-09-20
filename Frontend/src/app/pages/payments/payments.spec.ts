import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Payments } from './payments';
import { PaymentsPageService } from './payments.service';

describe('Payments', () => {
  let component: Payments;
  let fixture: ComponentFixture<Payments>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Payments],
      providers: [
        provideZonelessChangeDetection(),
        PaymentsPageService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Payments);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load payments', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('http://localhost:5147/api/payments');
    expect(req.request.method).toBe('GET');
    req.flush({
      success: true,
      data: [{ payment_id: 'p1', payment_transaction_amount: 10, payment_user_id: 'u1', payment_method: 'card', payment_status: 'success', payment_type: 'late_fee', payment_reference_id: 'REF1', payment_notes: '' }],
    });

    expect(component).toBeTruthy();
  });
});
