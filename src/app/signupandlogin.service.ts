import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User, LoginDetails, LoginResult, SignupResult } from './signupandlogin.model';

@Injectable({
  providedIn: 'root'
})
export class SignupandloginService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:5000"
  
  createnewuser(user:any,file:Blob|string,usertype:string){
    const userdata = {
      profile_picture:file,
      username:user.username,
      password:user.password,
      category:user.category,
      description:user.description,
      directions:user.directions,
      email:user.email,
      phone_number:user.phone_number,
      shipping_address:"",
      address:{
        house_number:user.house_number,
        latitude:user.latitude || 0,
        longtitude:user.longtitude || 0,
        postal_code:user.postal_code || 0,
        state:user.state,
        street:user.street,
        country:user.country,
        city:user.city
      }
      //payment_details:JSON.stringify(user.payment_details),
    }
    return this.http.post<SignupResult>(`${this.url}/auth/register/${usertype}`,userdata).pipe(
      retry(2)
    )
  }

  loginexistinguser(user:LoginDetails){
    let logindata = new FormData()
    //will change this later... it just means that the user can login with either username, email or phone number
    let parsedUser = {
      email:user.username,
      account_type:user.usertype,
      password:user.password,
      username:"le_user"
    }
    return this.http.post<any>(`${this.url}/auth/login`,parsedUser)
    .pipe(
      retry(2),
      tap((val)=>console.log(val)),
      catchError((err,caught)=>{
        return of(err)
      })
    )
  }
} 
