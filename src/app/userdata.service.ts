import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Favorite, Buyer, BuyerUncheckedItems, Seller, SellerUncheckedItems, Delivery } from "./userdata.model";

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:5000"

  //we need to know the usertype... we can't have a seller adding to favorites now can we?
  getbuyerfavorites(buyerid:string,usertype:string){
    return this.http.get<Favorite[]>(
      `${this.url}/favorites/${buyerid}`)
      .pipe(
        retry(2)
      )
  }

  addasfavorite(buyerid:string,favoritetype:string,favoriteid:string) : Observable<boolean>{
    let favoriteformdata = new FormData()
    favoriteformdata.append("user_id",buyerid)
    favoriteformdata.append("favorite_type",favoritetype)
    favoriteformdata.append("favorite_id",favoriteid)
    favoriteformdata.append("control_type","add")
    return this.http.post<boolean>(`${this.url}/favorites/new`,favoriteformdata)
    .pipe(
      retry(2)
    )
  }

  removefavorite(buyerid:string,favoritetype:string,favoriteid:string){
    let favoriteformdata = new FormData()
    favoriteformdata.append("user_id",buyerid)
    favoriteformdata.append("favorite_type",favoritetype)
    favoriteformdata.append("favorite_id",favoriteid)
    favoriteformdata.append("control_type","remove")
    return this.http.delete<boolean>(`${this.url}/favorites/${favoriteid}`)
    .pipe(
      retry(2)
    )
  }

  //needs to be discussed
  getbuyerdata(buyerid:string|null){
    return this.http.get<Buyer>(
      `${this.url}/user/${buyerid}`)
      .pipe(
        retry(2)
      )
  }

  //needs to be discussed
  getsellerdata(sellerid:string|null){
    return this.http.get<Seller>(
      `${this.url}/user/${sellerid}`)
      .pipe(
        retry(2)
      )
  }

  /************************************************************************************************************** */
  getdeliverydata(deliveryid:string|null){
    return this.http.get<Delivery>(
      `http://localhost/markt_php/get_user_data.php?user_id=${deliveryid}&user_type=delivery`)
    .pipe(
      retry(2)
    )
  }

  //I do not know what these are for so until i check the php code
  get_buyer_unchecked_items(buyerid:string){
    return this.http.get<BuyerUncheckedItems>(
      `http://localhost/markt_php/get_unchecked_items.php?user_id=${buyerid}&user_type=buyer`)
    .pipe(
      retry(2)
    )
  }

  get_seller_unchecked_items(sellerid:string){
    return this.http.get<SellerUncheckedItems>(
      `http://localhost/markt_php/get_unchecked_items.php?user_id=${sellerid}&user_type=seller`)
    .pipe(
      retry(2)
    )
  }

  /************************************************************************************************************** */

  updatebuyerdata(buyerid:string,buyer:Buyer|undefined){
    let buyerdata = new FormData()
    buyerdata.append("user_id",buyerid)
    buyerdata.append("user_type","buyer")
    buyerdata.append("buyer_data",JSON.stringify(buyer))
    return this.http.put(`${this.url}/user/${buyerid}`,buyerdata)
    .pipe(
      retry(2)
    )
  }

  updatesellerdata(sellerid:string,seller:Seller|undefined){
    let sellerdata = new FormData()
    sellerdata.append("user_id",sellerid)
    sellerdata.append("user_type","seller")
    sellerdata.append("seller_data",JSON.stringify(seller))
    return this.http.put(`${this.url}/user/${sellerid}`,sellerdata)
    .pipe(
      retry(2)
    )
  }

  /* updatedeliverydata(deliveryid:string,delivery:Delivery|undefined){
    let deliverydata = new FormData()
    deliverydata.append("user_id",deliveryid)
    deliverydata.append("user_type","delivery")
    deliverydata.append("delivery_data",JSON.stringify(delivery))
    return this.http.post("http://localhost/markt_php/update_user_data.php",deliverydata)
    .pipe(
      retry(2)
    )
  } */

  updateuserprofileimage(user_type:string,user_id:string,profile_image:File){
    let userdata = new FormData()
    userdata.append("user_type",user_type)
    userdata.append("user_id",user_id)
    userdata.append("profile_image",profile_image)
    return this.http.patch<Boolean>(`${this.url}/user/update-profile-picture`,userdata)
    .pipe(
      retry(2)
    )
  }

  setuserretrievalmail(user_type:string,email:string){
    let userresetdata = new FormData()
    userresetdata.append("user_type",user_type)
    userresetdata.append("email",email)
    return this.http.post(`${this.url}/psw_ret/create`,userresetdata)
    .pipe(
      retry(2)
    )
  }

  setuserretrievalphone(user_type:string,phone:string){
    let userresetdata = new FormData()
    userresetdata.append("user_type",user_type)
    userresetdata.append("phone",phone)
    return this.http.post(`${this.url}/psw_ret/create`,userresetdata)
    .pipe(
      retry(2)
    )
  }

  resetuserpasswordmail(email:string,new_password:string,retrieval_code:string,user_type:string){
    let passwordchangedata = new FormData()
    passwordchangedata.append("user_type",user_type)
    passwordchangedata.append("password",new_password)
    passwordchangedata.append("email",email)
    passwordchangedata.append("retrieval_code",retrieval_code)
    return this.http.post<boolean>(`${this.url}/psw_ret/check`,passwordchangedata)
    .pipe(
      retry(2)
    )
  }

  resetuserpasswordphone(phonenumber:string,new_password:string,retrieval_code:string,user_type:string){
    let passwordchangedata = new FormData()
    passwordchangedata.append("user_type",user_type)
    passwordchangedata.append("password",new_password)
    passwordchangedata.append("phone_number",phonenumber)
    passwordchangedata.append("retrieval_code",retrieval_code)
    return this.http.post<boolean>(`${this.url}/psw_ret/check`,passwordchangedata)
    .pipe(
      retry(2)
    )
  }
}
