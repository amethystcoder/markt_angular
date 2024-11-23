import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import { ClassicResponse, Cart } from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  createCart(cartItem: Cart): Observable<HttpResponse<ClassicResponse>> {
    return this.http
      .post<ClassicResponse>(ApiStore.mergeEndpoint('cart', 'new'), cartItem, {
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

  getBuyerCart(buyerId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(ApiStore.mergeEndpoint('cart', buyerId)).pipe(
      tap((data) => console.log(data)),
      retry(3),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  removeCart(cartId: string): Observable<HttpResponse<ClassicResponse>> {
    return this.http
      .delete<ClassicResponse>(ApiStore.mergeEndpoint('cart', cartId), {
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
}
