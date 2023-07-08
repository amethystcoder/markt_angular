import { Component, OnInit } from '@angular/core';
import { OrderApiService } from '../order-api.service';
import { UserstateService } from '../userstate.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit{

  ngOnInit(): void {
    this.userstate.user_type_sub.subscribe((type)=>{
      this.usertype = type
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
    })
  }

  constructor(private userstate:UserstateService,private order_api:OrderApiService){}

  usertype = ""
  userid = ""

  
}
