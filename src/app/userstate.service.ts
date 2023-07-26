import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './product-api.service';
import { BuyerOrders, Orders, UnacceptedOrders } from './order-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserstateService {

  constructor() { }

  user_type = new BehaviorSubject<string>("buyer")
  user_name = new BehaviorSubject<string>("")
  user_id = new BehaviorSubject<string>("")
  user_profile_image = new BehaviorSubject<string>("")
  longtitude = new BehaviorSubject<number>(0)
  latitude = new BehaviorSubject<number>(0)
  cartitems = new BehaviorSubject<CartItem[]>([])
  buyerorders = new BehaviorSubject<BuyerOrders[]>([])
  sellerpendingorders = new BehaviorSubject<UnacceptedOrders[]>([])
  selleracceptedorders = new BehaviorSubject<Orders[]>([])
  //chatstate = new BehaviorSubject<string>("closed")

  user_type_sub = this.user_type.asObservable()
  user_name_sub = this.user_name.asObservable()
  user_id_sub = this.user_id.asObservable()
  user_profile_image_sub = this.user_profile_image.asObservable()
  longtitude_sub = this.longtitude.asObservable()
  latitude_sub = this.latitude.asObservable()
  cartitems_sub = this.cartitems.asObservable()
  buyerorders_sub = this.buyerorders.asObservable()
  sellerpendingorders_sub = this.sellerpendingorders.asObservable()
  selleracceptedorders_sub = this.selleracceptedorders.asObservable()
  //chatstate_sub = this.chatstate.asObservable()

  setuser(user_type:string,user_name:string,user_id:string,user_profile_image:string){
    this.user_id.next(user_id)
    this.user_name.next(user_name)
    this.user_type.next(user_type)
    this.user_profile_image.next(user_profile_image)
  }

}