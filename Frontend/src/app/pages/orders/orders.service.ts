import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order, OrderResponse } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Injectable({ providedIn: 'root' })
export class OrdersPageService {
  private readonly orderService = inject(OrderService);

  public getAllOrders(): Observable<Order[]> {
    return this.orderService.getAllOrders().pipe(
      map((res) => {
        const list = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
        return list.map((o: any) => ({
          order_id: o.order_id || o.id || o.Id || '',
          order_user_id: o.order_user_id || o.userId || o.UserId || '',
          order_book_id: o.order_book_id || o.bookId || o.BookId || '',
          order_due_at: o.order_due_at || o.dueAt || o.DueAt || new Date().toISOString(),
          order_fine_amount: o.order_fine_amount ?? o.fineAmount ?? o.FineAmount ?? 0,
          order_has_fine: o.order_has_fine ?? o.hasFineAmount ?? o.HasFineAmount ?? false,
          order_is_damaged: o.order_is_damaged ?? o.isDamaged ?? o.IsDamaged ?? false,
        }));
      })
    );
  }

  public addOrder(order: Order): Observable<OrderResponse> {
    return this.orderService.addOrder(order);
  }

  public updateOrder(id: string, order: Order): Observable<OrderResponse> {
    return this.orderService.updateOrder(id, order);
  }

  public deleteOrder(id: string): Observable<OrderResponse> {
    return this.orderService.deleteOrder(id);
  }
}
