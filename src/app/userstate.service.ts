import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from './products.model';
import { BuyerOrders, Orders, UnacceptedOrders } from './orders.model';
import { Chats } from './chat.model';
import { signalStore } from "@ngrx/signals";

export let user_type = new BehaviorSubject<string>("buyer")
export let user_name = new BehaviorSubject<string>("")
export let user_id = new BehaviorSubject<string>("")
export let user_profile_image = new BehaviorSubject<string>("")
export let longtitude = new BehaviorSubject<number>(0)
export let latitude = new BehaviorSubject<number>(0)
export let cartitems = new BehaviorSubject<CartItem[]>([])
export let buyerorders = new BehaviorSubject<BuyerOrders[]>([])
export let sellerpendingorders = new BehaviorSubject<UnacceptedOrders[]>([])
export let selleracceptedorders = new BehaviorSubject<Orders[]>([])
export let newchatuser = new Subject<Chats>()
export let user_type_sub = user_type.asObservable()
export let user_name_sub = user_name.asObservable()
export let user_id_sub = user_id.asObservable()
export let user_profile_image_sub = user_profile_image.asObservable()
export let longtitude_sub = longtitude.asObservable()
export let latitude_sub = latitude.asObservable()
export let cartitems_sub = cartitems.asObservable()
export let buyerorders_sub = buyerorders.asObservable()
export let sellerpendingorders_sub = sellerpendingorders.asObservable()
export let selleracceptedorders_sub = selleracceptedorders.asObservable()
export let newchatuser_sub = newchatuser.asObservable()

@Injectable({
  providedIn: 'root'
})
export class UserstateService {

  constructor(private location:Location) { }

  setuser(userType:string,userName:string,userId:string,userProfileImage:string){
    user_id.next(userId)
    user_name.next(userName)
    user_type.next(userType)
    user_profile_image.next(userProfileImage)
  }

  previouspage(){
    this.location.back()
  }

}