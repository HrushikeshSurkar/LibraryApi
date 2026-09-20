export interface Order {
  order_id?: string;
  order_user_id: string;
  order_book_id: string;
  order_due_at: string;
  order_fine_amount: number;
  order_has_fine: boolean;
  order_is_damaged: boolean;
}

export interface OrderResponse {
  data?: Order[] | Order;
  message: string;
  success?: boolean;
}
