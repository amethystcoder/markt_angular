import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  //   /comments/new
  createComment(data: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments/new`, data);
  }

  //   /comments/rate_and_comment
  createRateAndComment(data: Comment): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.apiUrl}/comments/rate_and_comment`,
      data
    );
  }

  //   /comments/a-product-id
  getProductComments(productId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/${productId}`);
  }

  // /comments/a-comment-id
  removeComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/comments/${commentId}`);
  }
}
