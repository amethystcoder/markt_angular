import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, tap } from 'rxjs';
import { ApiStore } from "../apiSpecificData";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  http = inject(HttpClient)

  authenticateUser(authData:any):Observable<any>{
    return this.http.post(ApiStore.mergeEndpoint("api"),authData,{
      observe:"response"
    }).pipe(
      tap((data)=>console.log(data)),
      retry(3)
    )
  }
}
