import { Component, OnInit, inject } from '@angular/core';
import { OrderApiService } from '../order-api.service';
import { DeliveryOrders } from "../orders.model";
import { UserstateService, signalstore } from '../userstate.service';

@Component({
  selector: 'app-pending-deliveries',
  templateUrl: './pending-deliveries.component.html',
  styleUrls: ['./pending-deliveries.component.css']
})
export class PendingDeliveriesComponent implements OnInit{

  ngOnInit(): void {
    this.order_api.getdeliverypendingdeliveries(this.userid).subscribe((orders)=>{
      this.pendingdeliveries = orders
    })
  }

  constructor(private userstate:UserstateService,private order_api:OrderApiService){}

  store = inject(signalstore)

  usertype = this.store.user_type()
  userid = this.store.user_id()

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
