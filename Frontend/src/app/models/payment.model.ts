export type PaymentMethod = 'cash' | 'upi' | 'card' | 'net_banking';
export type PaymentStatus = 'success' | 'pending' | 'failed' | 'refunded';
export type PaymentType = 'late_fee' | 'damage_charge' | 'lost_book_fee' | 'membership_fee';

export interface Payment {
  payment_id?: string;
  payment_transaction_amount: number;
  payment_order_id?: string;
  payment_user_id: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_type: PaymentType;
  payment_reference_id: string;
  payment_notes: string;
}

export interface PaymentResponse {
  data?: Payment[] | Payment;
  message: string;
  success?: boolean;
}
