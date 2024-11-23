import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import { ClassicResponse, Order } from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  createOrder(order: Order): Observable<HttpResponse<ClassicResponse>> {
    return this.http
      .post<ClassicResponse>(ApiStore.mergeEndpoint('orders', 'new'), order, {
        observe: 'response',
      })
      .pipe(
        tap((data) => console.log(data)),
        retry(3),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getBuyerOrders(buyerId: string): Observable<Order[]> {
    return this.http
      .get<Order[]>(ApiStore.mergeEndpoint('orders', 'buyers', buyerId))
      .pipe(
        tap((data) => console.log(data)),
        retry(3),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getSellerAcceptedOrders(sellerId: string): Observable<Order[]> {
    return this.http
      .get<Order[]>(
        ApiStore.mergeEndpoint('orders', 'sellers', 'accepted', sellerId)
      )
      .pipe(
        tap((data) => console.log(data)),
        retry(3),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }
}
