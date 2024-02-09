import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { OrderApiService } from '../order-api.service';
import { DeliveryOrders } from "../orders.model";

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.css']
})
export class DeliveryOrdersComponent implements OnInit{

  ngOnInit(): void {
    //use store
    /* this.userstate.user_type_sub.subscribe((type)=>{
      this.usertype = type
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
    }) */
    this.order_api.getclosedeliveryorders(this.userid).subscribe((orders)=>{
      this.deliveryorders = orders
    })
  }

  constructor(private userstate:UserstateService,private order_api:OrderApiService){}

  usertype = ""
  userid = ""

  deliveryorders:DeliveryOrders[] = []

  handledelivery(deliveryorder:DeliveryOrders){
    this.order_api.handleorder(this.userid,deliveryorder.order_id).subscribe((result)=>{
      if(result){
        this.deliveryorders.splice(this.deliveryorders.indexOf(deliveryorder),1)
      }
    })
  }

}
