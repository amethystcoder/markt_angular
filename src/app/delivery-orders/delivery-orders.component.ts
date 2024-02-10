import { Component, OnInit, inject } from '@angular/core';
import { UserstateService, signalstore } from '../userstate.service';
import { OrderApiService } from '../order-api.service';
import { DeliveryOrders } from "../orders.model";

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.css']
})
export class DeliveryOrdersComponent implements OnInit{

  ngOnInit(): void {
    this.order_api.getclosedeliveryorders(this.userid).subscribe((orders)=>{
      this.deliveryorders = orders
    })
  }

  constructor(private userstate:UserstateService,private order_api:OrderApiService){}

  store = inject(signalstore)

  usertype = this.store.user_type()
  userid = this.store.user_id()

  deliveryorders:DeliveryOrders[] = []

  handledelivery(deliveryorder:DeliveryOrders){
    this.order_api.handleorder(this.userid,deliveryorder.order_id).subscribe((result)=>{
      if(result){
        this.deliveryorders.splice(this.deliveryorders.indexOf(deliveryorder),1)
      }
    })
  }

}
