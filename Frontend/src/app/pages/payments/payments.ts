import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Payment, PaymentMethod, PaymentStatus, PaymentType } from '../../models/payment.model';
import { PaymentsPageService } from './payments.service';
import { Navbar } from '../dashboard/components/navbar/navbar';

@Component({
  selector: 'app-payments',
  imports: [ReactiveFormsModule, Navbar],
  templateUrl: './payments.html',
  styleUrl: './payments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Payments implements OnInit {
  private readonly paymentsService = inject(PaymentsPageService);

  protected payments = signal<Payment[]>([]);
  protected isEditMode = signal<boolean>(false);
  protected selectedPaymentId = signal<string | null>(null);

  protected paymentForm = new FormGroup({
    payment_transaction_amount: new FormControl<number>(0, [Validators.required, Validators.min(0.01)]),
    payment_user_id: new FormControl('', Validators.required),
    payment_order_id: new FormControl(''),
    payment_method: new FormControl<PaymentMethod>('card', Validators.required),
    payment_status: new FormControl<PaymentStatus>('success', Validators.required),
    payment_type: new FormControl<PaymentType>('late_fee', Validators.required),
    payment_reference_id: new FormControl('', Validators.required),
    payment_notes: new FormControl(''),
  });

  ngOnInit(): void {
    this.loadPayments();
  }

  private loadPayments(): void {
    this.paymentsService.getAllPayments().subscribe({
      next: (data) => this.payments.set(data),
      error: (err) => console.error('Error fetching payments:', err),
    });
  }

  protected savePayment(): void {
    if (this.paymentForm.invalid) return;

    const payload: Payment = {
      payment_transaction_amount: this.paymentForm.value.payment_transaction_amount || 0,
      payment_user_id: this.paymentForm.value.payment_user_id || '',
      payment_order_id: this.paymentForm.value.payment_order_id || undefined,
      payment_method: this.paymentForm.value.payment_method || 'card',
      payment_status: this.paymentForm.value.payment_status || 'success',
      payment_type: this.paymentForm.value.payment_type || 'late_fee',
      payment_reference_id: this.paymentForm.value.payment_reference_id || `REF-${Date.now()}`,
      payment_notes: this.paymentForm.value.payment_notes || '',
    };

    const id = this.selectedPaymentId();
    if (this.isEditMode() && id) {
      this.paymentsService.updatePayment(id, payload).subscribe(() => {
        this.loadPayments();
        this.resetForm();
      });
    } else {
      this.paymentsService.addPayment(payload).subscribe(() => {
        this.loadPayments();
        this.resetForm();
      });
    }
  }

  protected editPayment(payment: Payment): void {
    if (!payment.payment_id) return;
    this.selectedPaymentId.set(payment.payment_id);
    this.isEditMode.set(true);

    this.paymentForm.patchValue({
      payment_transaction_amount: payment.payment_transaction_amount,
      payment_user_id: payment.payment_user_id,
      payment_order_id: payment.payment_order_id || '',
      payment_method: payment.payment_method,
      payment_status: payment.payment_status,
      payment_type: payment.payment_type,
      payment_reference_id: payment.payment_reference_id,
      payment_notes: payment.payment_notes,
    });
  }

  protected deletePayment(id: string): void {
    this.paymentsService.deletePayment(id).subscribe(() => {
      this.payments.update((current) => current.filter((p) => p.payment_id !== id));
    });
  }

  protected resetForm(): void {
    this.paymentForm.reset({
      payment_transaction_amount: 0,
      payment_method: 'card',
      payment_status: 'success',
      payment_type: 'late_fee',
    });
    this.isEditMode.set(false);
    this.selectedPaymentId.set(null);
  }
}
