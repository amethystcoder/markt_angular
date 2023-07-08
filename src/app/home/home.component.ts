import { Component, OnInit} from '@angular/core';
import { Product, ProductApiService } from '../product-api.service';
import { OrderApiService, UnacceptedOrders } from '../order-api.service';
import { UserstateService } from '../userstate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(){
    this.userstate.user_id_sub.subscribe((user_id)=>{
      this.userid = user_id
    })
    this.userstate.user_type_sub.subscribe((user_type)=>{
      this.usertype = user_type
      switch(user_type){
        case "seller":
          this.productapi.getsellerproducts(this.userid)
          .subscribe((data)=>{
            this.sellerproductlist = data
          })
          this.orderapi.getpendingorders(this.userid)
                .subscribe((data)=>{
                  this.sellerpendingorderlist = data
                })
          break
        case "buyer":
          this.orderapi.getbuyerorders(this.userid).subscribe((data)=>{
            this.buyerorderlist = data
          })
          break
      }
    })
  }

  constructor(
    private productapi:ProductApiService,private orderapi:OrderApiService,private userstate:UserstateService){}

  usertype = ""

  userid = ""

  sellerproductlist:Array<Product> = []
  sellerpendingorderlist:Array<UnacceptedOrders> = []
  buyerorderlist:any = []

  acceptorder(orderid:string){
    this.orderapi.acceptorder(orderid,this.userid,'seller')
    .subscribe((data)=>{
      console.log(data)
    })
  }

  declineorder(orderid:string){
    this.orderapi.declineorder(orderid,this.userid,'seller')
    .subscribe((data)=>{
      console.log(data)
    })
  }
}
