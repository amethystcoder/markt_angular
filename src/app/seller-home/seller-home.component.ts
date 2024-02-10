import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Product } from "../products.model";
import { OrderApiService } from '../order-api.service';
import { BuyerOrders, Orders, UnacceptedOrders } from "../orders.model";
import { UserstateService, signalstore } from '../userstate.service';
import { Chats } from "../chat.model";

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit,OnDestroy{
  ngOnInit(): void {
    this.productapi.getsellerproducts(this.userid).subscribe((data)=>{
      this.sellerproductlist = data
    })
    this.orderapi.getpendingorders(this.userid).subscribe((data)=>{
        this.sellerpendingorderlist = data
    })
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  constructor(
    private productapi:ProductApiService,private orderapi:OrderApiService,private userstate:UserstateService){}


  store = inject(signalstore)

  sellerproductlist:Array<Product> = []
  sellerpendingorderlist:Array<UnacceptedOrders> = []

  usertype = this.store.user_type()
  userid = this.store.user_id()

  acceptorder(orderid:string){
    this.orderapi.acceptorder(orderid,this.userid,'seller')
    .subscribe((data)=>{
      //console.log(data)
    })
  }

  declineorder(orderid:string){
    this.orderapi.declineorder(orderid,this.userid,'seller')
    .subscribe((data)=>{
      //console.log(data)
    }) 
  }

}
