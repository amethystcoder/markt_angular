import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Buyer,
  BuyerRegister,
  Seller,
  SellerRegister,
  User,
  UserProfile,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  // /auth/register/seller
  createSeller(data: SellerRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/seller`, data);
  }

  // /auth/register/buyer
  createBuyer(data: BuyerRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/buyer`, data);
  }

  // /auth/create-buyer
  createBuyerFromUsername(data: Buyer): Observable<Buyer> {
    return this.http.post<Buyer>(`${this.apiUrl}/auth/create-buyer`, data);
  }

  // /auth/create-seller
  createSellerFromUsername(data: Seller): Observable<Seller> {
    return this.http.post<Seller>(`${this.apiUrl}/auth/create-seller`, data);
  }

  // /auth/existinguser/placeholder_usern
  getExistingUsername(username: string): Observable<string> {
    return this.http.get<string>(
      `${this.apiUrl}/auth/existinguser/${username}`
    );
  }

  // /user/blahblahblah
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
  }

  // /user/buyer
  getBuyer(buyerId: string): Observable<Buyer> {
    return this.http.get<Buyer>(`${this.apiUrl}/user/buyer/${buyerId}`);
  }

  // /user/seller
  getSeller(sellerId: string): Observable<Seller> {
    return this.http.get<Seller>(`${this.apiUrl}/user/seller/${sellerId}`);
  }

  // /user/profile
  getUserProfile(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile/${userId}`);
  }

  // /user/buyer
  removeBuyer(buyerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/buyer/${buyerId}`);
  }

  // /user/seller
  removeSeller(sellerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/seller/${sellerId}`);
  }
}
