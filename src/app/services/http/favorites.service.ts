import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import { Favorite } from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private http = inject(HttpClient);

  createFavorite(favoriteData: Favorite): Observable<Favorite> {
    return this.http
      .post<Favorite>(ApiStore.mergeEndpoint('favorites', 'new'), favoriteData)
      .pipe(
        tap((data) => console.log(data)),
        retry(3),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getBuyerFavorites(buyerId: string): Observable<Favorite[]> {
    return this.http
      .get<Favorite[]>(ApiStore.mergeEndpoint('favorites', 'buyer', buyerId))
      .pipe(
        tap((response) => console.log(response)),
        retry(3),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  removeBuyerFavorite(favoriteId: string): Observable<any> {
    return this.http
      .delete(ApiStore.mergeEndpoint('favorites', favoriteId))
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
