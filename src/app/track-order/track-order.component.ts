import { Component, OnInit, inject } from '@angular/core';
import { OrderApiService } from '../order-api.service';
import { UserstateService, signalstore } from '../userstate.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit{

  ngOnInit(): void {}

  constructor(private userstate:UserstateService,private order_api:OrderApiService){}

  store = inject(signalstore)

  usertype = this.store.user_type()
  userid = this.store.user_id()

  
}
