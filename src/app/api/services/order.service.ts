import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  // /orders/new
  createOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders/new`, data);
  }

  // /orders/buyers/a-buyer-id
  getBuyerOrders(buyerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/buyers/${buyerId}`);
  }

  // /orders/sellers/accepted/a-seller-id
  getSellerAcceptedOrders(sellerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.apiUrl}/orders/sellers/accepted/${sellerId}`
    );
  }

  //  /orders/sellers/pending/a-seller-id
  /**
   Name fix? Shouldn't the route be buyers, not sellers?
   */
  getBuyerPendingOrders(buyerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.apiUrl}/orders/sellers/pending/${buyerId}`
    );
  }
}
