import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PasswordRetrieval } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  //   /psw_ret/check
  createChangePassword(data: PasswordRetrieval): Observable<PasswordRetrieval> {
    return this.http.post<PasswordRetrieval>(
      `${this.apiUrl}/psw_ret/check`,
      data
    );
  }

  //   /psw_ret/create
  createPasswordRetrievalCode(
    data: PasswordRetrieval
  ): Observable<PasswordRetrieval> {
    return this.http.post<PasswordRetrieval>(
      `${this.apiUrl}/psw_ret/create`,
      data
    );
  }
}
