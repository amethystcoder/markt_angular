import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import { BuyerResponse } from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  private http = inject(HttpClient);

  getBuyerDetails(buyerId: string): Observable<BuyerResponse> {
    return this.http
      .get<BuyerResponse>(ApiStore.mergeEndpoint('user', 'buyer', buyerId))
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
