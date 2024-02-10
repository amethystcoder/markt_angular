import { Component, OnInit, inject } from '@angular/core';
import { UserstateService } from '../userstate.service';
import {  ProductApiService } from '../product-api.service';
import { CartItem } from "../products.model";
import { OrderApiService } from '../order-api.service';
import { Router } from '@angular/router';
import { signalstore } from "../userstate.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  ngOnInit(): void {
    this.productapi.getbuyerbasketitems(this.userid,this.usertype)
    .subscribe((cartitems)=>{
      this.buyercart = cartitems
    })
  }

  private userstate = inject(UserstateService)
  private productapi = inject(ProductApiService)
  private order_api = inject(OrderApiService)
  private router = inject(Router)
  store = inject(signalstore)

  userid = this.store.user_id()
  usertype = this.store.user_type()

  buyercart:CartItem[] = []

  removeproduct(cartitem:CartItem){
    this.productapi.removeitemfromcart(this.userid,cartitem.cart_id)
    .subscribe((result)=>{
      if(result){
        this.buyercart.splice(this.buyercart.indexOf(cartitem),1)
        this.store.updatebuyercart(cartitem)
      }
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
