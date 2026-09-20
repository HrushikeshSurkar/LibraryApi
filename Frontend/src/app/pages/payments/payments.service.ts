import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Payment, PaymentResponse } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';

@Injectable({ providedIn: 'root' })
export class PaymentsPageService {
  private readonly paymentService = inject(PaymentService);

  public getAllPayments(): Observable<Payment[]> {
    return this.paymentService.getAllPayments().pipe(
      map((res) => {
        const list = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
        return list.map((p: any) => ({
          payment_id: p.payment_id || p.id || p.Id || '',
          payment_transaction_amount: p.payment_transaction_amount ?? p.transactionAmount ?? p.TransactionAmount ?? 0,
          payment_user_id: p.payment_user_id || p.userId || p.UserId || '',
          payment_order_id: p.payment_order_id || p.orderId || p.OrderId || '',
          payment_method: p.payment_method || p.paymentMethod || p.PaymentMethod || 'card',
          payment_status: p.payment_status || p.paymentStatus || p.PaymentStatus || 'success',
          payment_type: p.payment_type || p.paymentType || p.PaymentType || 'late_fee',
          payment_reference_id: p.payment_reference_id || p.paymentReferenceId || p.PaymentReferenceId || '',
          payment_notes: p.payment_notes || p.paymentNotes || p.PaymentNotes || '',
        }));
      })
    );
  }

  public addPayment(payment: Payment): Observable<PaymentResponse> {
    return this.paymentService.addPayment(payment);
  }

  public updatePayment(id: string, payment: Payment): Observable<PaymentResponse> {
    return this.paymentService.updatePayment(id, payment);
  }

  public deletePayment(id: string): Observable<PaymentResponse> {
    return this.paymentService.deletePayment(id);
  }
}
