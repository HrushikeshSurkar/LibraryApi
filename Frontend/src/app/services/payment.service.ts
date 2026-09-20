import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment, PaymentResponse } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5147/api/payments';

  public getAllPayments(): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(this.apiUrl);
  }

  public addPayment(payment: Payment): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(this.apiUrl, payment);
  }

  public updatePayment(id: string, payment: Payment): Observable<PaymentResponse> {
    return this.http.put<PaymentResponse>(`${this.apiUrl}/${id}`, payment);
  }

  public deletePayment(id: string): Observable<PaymentResponse> {
    return this.http.delete<PaymentResponse>(`${this.apiUrl}/${id}`);
  }
}
