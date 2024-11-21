import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  //   /cart/a-buyer-id
  createCart(data: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/cart/new`, data);
  }

  //  cart/a-buyer-id
  getBuyerCartItems(buyerId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/cart/${buyerId}`);
  }

  //   /cart/a-cart-id
  removeCart(cartId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${cartId}`);
  }
}
