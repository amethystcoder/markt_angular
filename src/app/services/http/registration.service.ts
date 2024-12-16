import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import {
  ClassicResponse,
  UserLoginResponse,
  BuyerRegister,
  SellerRegister,
} from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor() {}

  http = inject(HttpClient);

  registerBuyer(
    registerData: BuyerRegister
  ): Observable<HttpResponse<ClassicResponse>> {
    return this.http
      .post<ClassicResponse>(
        ApiStore.mergeEndpoint('auth', 'register', 'buyer'),
        registerData,
        {
          observe: 'response',
        }
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
  ): Observable<HttpResponse<ClassicResponse>> {
    return this.http
      .post<ClassicResponse>(
        ApiStore.mergeEndpoint('auth', 'register', 'seller'),
        registerData,
        {
          observe: 'response',
        }
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
