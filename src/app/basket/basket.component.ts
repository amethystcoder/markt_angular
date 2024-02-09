import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import {  ProductApiService } from '../product-api.service';
import { CartItem } from "../products.model";
import { OrderApiService } from '../order-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  constructor(private userstate:UserstateService,private productapi:ProductApiService,
    private order_api:OrderApiService,private router:Router) { } 

  ngOnInit(): void {
    //use store
    /* this.userstate.user_type_sub.subscribe((usertype)=>{
      this.usertype = usertype
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
    }) */

    this.productapi.getbuyerbasketitems(this.userid,this.usertype)
    .subscribe((cartitems)=>{
      this.buyercart = cartitems
    })
  }

  userid = ""
  usertype = ""

  buyercart:CartItem[] = []

  removeproduct(cartitem:CartItem){
    this.productapi.removeitemfromcart(this.userid,cartitem.cart_id)
    .subscribe((result)=>{
      if(result)
        this.buyercart.splice(this.buyercart.indexOf(cartitem),1)
      //use store
        //this.userstate.cartitems.next(this.buyercart)
    })
  }

  checkout(){
    this.order_api.createorders(this.userid,this.usertype).subscribe((data)=>{
      this.router.navigate(["home"])
    })
  } 

  previous(){
   this.userstate.previouspage()
  }
}
