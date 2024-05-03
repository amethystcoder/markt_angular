import { Component, OnDestroy, OnInit, inject} from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Product } from "../products.model";
import { OrderApiService } from '../order-api.service';
import { BuyerOrders, BuyerOrdersEdt, Orders, UnacceptedOrders } from "../orders.model";
import { UserstateService, signalstore } from '../userstate.service';
import { Chats } from "../chat.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{

  ngOnInit(){
    this.orderapi.getbuyerorders(this.userid).subscribe((data)=>{
      console.log(data);
      this.buyerorderlist = data
    })
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

  buyerorderlist:any = [
    {
        "order_id": "order-660db0d2ba8c87.79838493",
        "seller_id": "seller-65d51f5b563fe0.90073258",
        "seller_shopname": "amethyste",
        "product_quantity": "1",
        "order_date": "2024-04-03",
        "declined": false,
        "accepted": false,
        "received_by_delivery": false,
        "has_discount": "0",
        "discount_percent": "0",
        "discount_price": "0",
        "delivery_name": "",
        "delivery_id": "",
        "product_name": null,
        "product_price": null,
        "product_id": null,
        "product_image": "placeholder-image",
        "optionOpen":false
    }
  ]

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

  submitquery(){
    this.productapi.createproductquery(this.query,this.userid,this.buyerquerycategory).subscribe((result)=>{
      if(result){
        this.query = ""
        this.buyerquerycategory = []
      }
    })
  }

  optionOpen = false

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

  toggleOptions(order:BuyerOrdersEdt){
    this.optionOpen = !this.optionOpen
  }
}
