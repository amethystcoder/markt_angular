import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import { ClassicResponse, Product } from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  createProduct(product: Product): Observable<HttpResponse<ClassicResponse>> {
    return this.http
      .post<ClassicResponse>(
        ApiStore.mergeEndpoint('products', 'new'),
        product,
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

  getProduct(productId: string): Observable<Product> {
    return this.http
      .get<Product>(ApiStore.mergeEndpoint('products', productId))
      .pipe(
        tap((data) => console.log(data)),
        retry(3),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  deleteProduct(productId: string): Observable<HttpResponse<ClassicResponse>> {
    return this.http
      .delete<ClassicResponse>(ApiStore.mergeEndpoint('products', productId), {
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
