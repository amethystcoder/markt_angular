import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from '../apiSpecificData';
import { Comment } from '../../api/models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);

  createComment(commentData: Comment): Observable<Comment> {
    return this.http
      .post<Comment>(ApiStore.mergeEndpoint('comments', 'new'), commentData)
      .pipe(
        tap((data) => console.log(data)),
        retry(3),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  createRateAndComment(commentData: Comment): Observable<Comment> {
    return this.http
      .post<Comment>(
        ApiStore.mergeEndpoint('comments', 'rate_and_comment'),
        commentData
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

  getProductComments(productId: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(ApiStore.mergeEndpoint('comments', productId))
      .pipe(
        tap((data) => console.log(data)),
        retry(3),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  removeComment(commentId: string): Observable<any> {
    return this.http.delete(ApiStore.mergeEndpoint('comments', commentId)).pipe(
      tap((data) => console.log(data)),
      retry(3),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
