import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '../../models/order.model';
import { OrdersPageService } from './orders.service';
import { Navbar } from '../dashboard/components/navbar/navbar';

@Component({
  selector: 'app-orders',
  imports: [ReactiveFormsModule, DatePipe, Navbar],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Orders implements OnInit {
  private readonly ordersService = inject(OrdersPageService);

  protected orders = signal<Order[]>([]);
  protected isEditMode = signal<boolean>(false);
  protected selectedOrderId = signal<string | null>(null);

  protected orderForm = new FormGroup({
    order_user_id: new FormControl('', Validators.required),
    order_book_id: new FormControl('', Validators.required),
    order_due_at: new FormControl('', Validators.required),
    order_fine_amount: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    order_has_fine: new FormControl<boolean>(false),
    order_is_damaged: new FormControl<boolean>(false),
  });

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (data) => this.orders.set(data),
      error: (err) => console.error('Error fetching orders:', err),
    });
  }

  protected saveOrder(): void {
    if (this.orderForm.invalid) return;

    const payload: Order = {
      order_user_id: this.orderForm.value.order_user_id || '',
      order_book_id: this.orderForm.value.order_book_id || '',
      order_due_at: this.orderForm.value.order_due_at || new Date().toISOString(),
      order_fine_amount: this.orderForm.value.order_fine_amount || 0,
      order_has_fine: !!this.orderForm.value.order_has_fine,
      order_is_damaged: !!this.orderForm.value.order_is_damaged,
    };

    const id = this.selectedOrderId();
    if (this.isEditMode() && id) {
      this.ordersService.updateOrder(id, payload).subscribe(() => {
        this.loadOrders();
        this.resetForm();
      });
    } else {
      this.ordersService.addOrder(payload).subscribe(() => {
        this.loadOrders();
        this.resetForm();
      });
    }
  }

  protected editOrder(order: Order): void {
    if (!order.order_id) return;
    this.selectedOrderId.set(order.order_id);
    this.isEditMode.set(true);

    const formattedDate = order.order_due_at ? new Date(order.order_due_at).toISOString().substring(0, 10) : '';

    this.orderForm.patchValue({
      order_user_id: order.order_user_id,
      order_book_id: order.order_book_id,
      order_due_at: formattedDate,
      order_fine_amount: order.order_fine_amount,
      order_has_fine: order.order_has_fine,
      order_is_damaged: order.order_is_damaged,
    });
  }

  protected deleteOrder(id: string): void {
    this.ordersService.deleteOrder(id).subscribe(() => {
      this.orders.update((current) => current.filter((o) => o.order_id !== id));
    });
  }

  protected resetForm(): void {
    this.orderForm.reset({
      order_fine_amount: 0,
      order_has_fine: false,
      order_is_damaged: false,
    });
    this.isEditMode.set(false);
    this.selectedOrderId.set(null);
  }
}
