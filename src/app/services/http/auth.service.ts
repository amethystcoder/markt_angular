import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, retry, tap } from 'rxjs';
import { ApiStore } from "../apiSpecificData";
import { UserLogin, UserLoginResponse } from '../../api/models';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  http = inject(HttpClient)

  authenticateUser(authData:UserLogin):Observable<HttpResponse<UserLoginResponse>>{
    return this.http.post<UserLoginResponse>(ApiStore.mergeEndpoint("auth","login"),authData,{
      observe:"response"
    }).pipe(
      tap((data)=>console.log(data)),
      retry(3),
      catchError(err => {
        console.error(err);
        return EMPTY;
      })
    )
  }

  logoutUser():Observable<HttpResponse<UserLoginResponse>>{
    return this.http.post<UserLoginResponse>(ApiStore.mergeEndpoint("auth","logout"),{},{
      observe:"response"
    }).pipe(
      tap((data)=>console.log(data)),
      retry(3),
      catchError(err => {
        console.error(err);
        return EMPTY;
      })
    )
  }
}
