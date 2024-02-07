import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User, LoginDetails, LoginResult, SignupResult } from './signupandlogin.model';

@Injectable({
  providedIn: 'root'
})
export class SignupandloginService {

  constructor(private http:HttpClient) { }
  
  createnewuser(user:any,file:Blob|string,usertype:string){
    let formdata = new FormData()
    formdata.append("profile_image",file)
    formdata.append("user_type",usertype)
    formdata.append("password",user.password)
    formdata.append("city",user.city)
    formdata.append("category",user.category)
    formdata.append("description",user.description)
    formdata.append("directions",user.directions)
    formdata.append("country",user.country)
    formdata.append("email",user.email)
    formdata.append("house_number",user.house_number)
    formdata.append("latitude",user.latitude)
    formdata.append("longtitude",user.longtitude)
    formdata.append("org_name",user.org_name)
    formdata.append("payment_details",JSON.stringify(user.payment_details))
    formdata.append("phone_number",user.phone_number)
    formdata.append("postal_code",user.postal_code)
    formdata.append("state",user.state)
    formdata.append("street",user.street)
    switch(usertype){
      case "buyer":
        formdata.append("username",user.username)
        break
      case "seller":
        formdata.append("shopname",user.username)
        break
      case "delivery":
        formdata.append("deliveryname",user.username)
        break
    }
    formdata.append("vehicle_type",user.vehicle_type)
    formdata.append("working_for_org",user.working_for_org)
    return this.http.post<SignupResult>("http://localhost/markt_php/signup.php",formdata).pipe(
      retry(2)
    )
  }

  loginexistinguser(user:LoginDetails){
    let logindata = new FormData()
    logindata.append("usernameoremailorphonenumber",user.username)
    logindata.append("user_type",user.usertype)
    logindata.append("password",user.password)
    return this.http.post<LoginResult>("http://localhost/markt_php/login.php",logindata)
    .pipe(
      retry(2)
    )
  }
} 
