import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import {
  ClassicResponse,
  BuyerRegister,
  SellerRegister,
  User,
  BuyerResponse,
  SellerResponse,
} from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  registerBuyer(
    registerData: BuyerRegister
  ): Observable<HttpResponse<BuyerResponse>> {
    return this.http
      .post<BuyerResponse>(
        ApiStore.mergeEndpoint('auth', 'register', 'buyer'),
        registerData,
        { observe: 'response' }
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

  registerSeller(
    registerData: SellerRegister
  ): Observable<HttpResponse<SellerResponse>> {
    return this.http
      .post<SellerResponse>(
        ApiStore.mergeEndpoint('auth', 'register', 'seller'),
        registerData,
        { observe: 'response' }
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

  //   getUser(username: string): Observable<User> {
  //     return this.http.get<User>(ApiStore.mergeEndpoint('user', username)).pipe(
  //       tap((data) => console.log(data)),
  //       retry(3),
  //       catchError((err) => {
  //         console.error(err);
  //         return EMPTY;
  //       })
  //     );
  //   }
}
