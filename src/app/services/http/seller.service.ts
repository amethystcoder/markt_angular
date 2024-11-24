import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import { SellerResponse } from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private http = inject(HttpClient);

  getSellerDetails(sellerId: string): Observable<SellerResponse> {
    return this.http
      .get<SellerResponse>(ApiStore.mergeEndpoint('user', 'seller', sellerId))
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
