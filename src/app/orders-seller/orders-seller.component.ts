import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OrderApiService } from '../order-api.service';
import { Orders, UnacceptedOrders } from "../orders.model";
import { UserstateService, signalstore } from '../userstate.service';

@Component({
  selector: 'app-orders-seller',
  templateUrl: './orders-seller.component.html',
  styleUrls: ['./orders-seller.component.css']
})
export class OrdersSellerComponent implements OnInit{

  constructor(private userstate:UserstateService,private order_api:OrderApiService){ }

  ngOnInit(): void {
    this.order_api.getpendingorders(this.userid).subscribe((orders)=>{
      this.pendingorders = orders
    })
    this.order_api.getacceptedorders(this.userid).subscribe((orders)=>{
      this.acceptedorders = orders 
    })
  }

  store = inject(signalstore)

  usertype = this.store.user_type()
  userid = this.store.user_id()

  orderviewtype = "pending"

  pendingorders:UnacceptedOrders[] = []
  acceptedorders:Orders[] = []

  settype(type:string){
    this.orderviewtype = type
  }

  acceptorder(order:UnacceptedOrders){
    this.order_api.acceptorder(order.order_id,this.userid,'seller')
    .subscribe((data)=>{
      if(data){
        this.pendingorders.splice(this.pendingorders.indexOf(order),1)
      }
    })
  }

  declineorder(order:UnacceptedOrders){
    this.order_api.declineorder(order.order_id,this.userid,'seller')
    .subscribe((data)=>{
      if(data){
        this.pendingorders.splice(this.pendingorders.indexOf(order),1)
      }
    }) 
  }
}
