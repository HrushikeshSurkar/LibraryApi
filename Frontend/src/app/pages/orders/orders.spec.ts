import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Orders } from './orders';
import { OrdersPageService } from './orders.service';

describe('Orders', () => {
  let component: Orders;
  let fixture: ComponentFixture<Orders>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orders],
      providers: [
        provideZonelessChangeDetection(),
        OrdersPageService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Orders);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load orders', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('http://localhost:5147/api/order');
    expect(req.request.method).toBe('GET');
    req.flush({
      success: true,
      data: [{ order_id: '1', order_user_id: 'u1', order_book_id: 'b1', order_due_at: '2026-01-01', order_fine_amount: 0, order_has_fine: false, order_is_damaged: false }],
    });

    expect(component).toBeTruthy();
  });
});
