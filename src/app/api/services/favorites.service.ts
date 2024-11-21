import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  //   /favorites/new
  createFavorite(data: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.apiUrl}/favorites/new`, data);
  }

  //   /favorites/a-favorite-id
  removeBuyerFavorite(favoriteId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${favoriteId}`);
  }

  //   /favorites/a-buyer-id
  removeAllBuyerFavorites(buyerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${buyerId}`);
  }

  // /favorites/a-buyer-id
  getBuyerFavorites(buyerId: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}/favorites/${buyerId}`);
  }
}
