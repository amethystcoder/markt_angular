import { Component, OnDestroy, OnInit, inject} from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Product } from "../products.model";
import { OrderApiService } from '../order-api.service';
import { BuyerOrders, Orders, UnacceptedOrders } from "../orders.model";
import { UserstateService, signalstore } from '../userstate.service';
import { Chats } from "../chat.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{

  ngOnInit(){
    switch(this.usertype){
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
    this.querychangeinterval = setInterval(()=>{
      if(this.inc == this.queryplaceholders.length - 1){
        this.inc = 0
      }
      else{
        this.inc++
      }
      this.queryplaceholder = this.queryplaceholders[this.inc]
    },6000)
  }

  ngOnDestroy(): void {
    clearInterval(this.querychangeinterval)
  }

  constructor(
    private productapi:ProductApiService,private orderapi:OrderApiService,private userstate:UserstateService){}


  store = inject(signalstore)

  usertype = this.store.user_type()
  userid = this.store.user_id()
  querychangeinterval:any

  inc = 0
  queryplaceholders = ["I want to buy cheap black canvas shoes less than 13,000",
                      "I am looking for a sound system that can can record sound from a sound engine",
                    "There is an equipment that can seal metal together like roofs and pipes, what is the name and how much is it?",
                  ]
  queryplaceholder = "Anyone selling saxophones less than 60,000 naira?"
  query = ""
  buyerquerycategory:string[] = []
  catgshow = false

  sellerproductlist:Array<Product> = []
  sellerpendingorderlist:Array<UnacceptedOrders> = []
  buyerorderlist:any = []

  removefromcategories(item:string){
    this.buyerquerycategory.splice(this.buyerquerycategory.indexOf(item),1)
  }

  opencatgories(){
    this.catgshow = !this.catgshow
  }

  mergecatgs(catgs:string[]){
    catgs.forEach((cat)=>{
      this.buyerquerycategory.push(cat)
    })
    this.catgshow = !this.catgshow
  }

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

  submitquery(){
    this.productapi.createproductquery(this.query,this.userid,this.buyerquerycategory).subscribe((result)=>{
      if(result){
        this.query = ""
        this.buyerquerycategory = []
      }
    })
  }

  opennewchat(order:BuyerOrders){
    let newchat:Chats = {
      messages:[],
      user_id:order.seller_id,
      user_name:order.seller_shopname,
      user_profile_image:"",
      user_type:"seller",
    }
    this.store.updatepresentchat(newchat)
  } 
}
