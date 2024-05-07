import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../product-api.service';
import { Product } from "../products.model";
import { OrderApiService } from '../order-api.service';
import { BuyerOrders, Orders, UnacceptedOrders } from "../orders.model";
import { UserstateService, signalstore } from '../userstate.service';
import { Chats } from "../chat.model";
import { Chart } from 'chart.js';

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
    this.chart = new Chart('canvas',{
      type:'bar',
      data:{
        labels: ['red', 'blue','yellow','green'],
        datasets: [
          {label:'no of votes',data:[2,4,6,2,35,7,5,77],borderWidth:1}
        ]
      }
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

  chart:any = []

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
