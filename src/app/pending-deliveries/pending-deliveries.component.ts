import { Component, OnInit } from '@angular/core';
import { DeliveryOrders, OrderApiService } from '../order-api.service';
import { UserstateService } from '../userstate.service';

@Component({
  selector: 'app-pending-deliveries',
  templateUrl: './pending-deliveries.component.html',
  styleUrls: ['./pending-deliveries.component.css']
})
export class PendingDeliveriesComponent implements OnInit{

  ngOnInit(): void {
    this.userstate.user_type_sub.subscribe((type)=>{
      this.usertype = type
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
    })
    this.order_api.getdeliverypendingdeliveries(this.userid).subscribe((orders)=>{
      this.pendingdeliveries = orders
    })
  }

  constructor(private userstate:UserstateService,private order_api:OrderApiService){}

  usertype = ""
  userid = ""

  pendingdeliveries:DeliveryOrders[] = []

  checkdeliverystate(delivery:DeliveryOrders){
    if(!delivery.delivered && !delivery.received_by_delivery){
      return "unreceived"
    }
    if(!delivery.delivered && delivery.received_by_delivery){
      return "undelivered"
    }
    return ""
  }

}
