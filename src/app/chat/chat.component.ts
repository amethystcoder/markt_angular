import { Component,Input, OnDestroy, OnInit, inject } from '@angular/core';
import { UserstateService, signalstore } from '../userstate.service';
import { ChatApiService } from '../chat-api.service';
import { Chat, Chats } from "../chat.model";
import { ProductApiService } from '../product-api.service';
import { Product } from "../products.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  constructor(private userstate:UserstateService,private chatservice:ChatApiService,
    private sellerproductservice: ProductApiService){}

  ngOnInit(): void {
    if (this.user_type.toLowerCase() == "seller") {
      this.sellerproductservice.getsellerproducts(this.user_id).subscribe((products)=>{
        this.seller_products = products
      })
    }
    this.selectedchatdetails = undefined
    this.chatservice.getchats(this.user_id).subscribe((data)=>{
      this.chats = data
    })
    this.chatservice.messagesobservable.subscribe((message)=>{
      this.chats.forEach((chat)=>{
        if(chat.user_id == message.sent_to || chat.user_id == message.sent_from){
          chat.messages.push(message)
        }
      })
    })
    this.chatservice.newreadmessagesobservable.subscribe((newmsgs)=>{
      let messages_to_read:any
      this.chats.forEach((chat)=>{
        if(chat.user_id == newmsgs.recipent){
          messages_to_read = chat
        }
      })
      if(messages_to_read){
        /* messages_to_read.messages.forEach(message => {

        }); */
      }
    })
  }

  store = inject(signalstore)

  discount = {
    discount_percent:0,
    discount_price:0,
    producttodiscount:null
  }

  producttodiscount!: Product;

  seller_products:Product[] = []

  newmessage = ""

  file!: File;

  user_id = this.store.user_id()

  user_type = this.store.user_type()

  @Input() selectedchatdetails:Chats | undefined

  chats:Chats[] = []

  state = "closed"

  chatsall = false

  discountopen = false

  conn = false

  openallchats(){
    this.state = "all"
    this.chatservice.connectws(this.user_id)
    this.chatservice
  }

  cancelchats(){
    this.state = "closed"
  }

  baktoallchats(){
    this.state = "all"
    this.selectedchatdetails = undefined
  }

  closeallchats(){
    this.state = "closed"
  }

  selectedchat_valid_and_already_available(){
    let selected = false
    if (this.selectedchatdetails) {
      this.state = "selected"
      for (let index = 0; index < this.chats.length; index++) {
        if (this.selectedchatdetails.user_id == this.chats[index].user_id) {
          this.selectedchatdetails = this.chats[index]
          selected = true
        }
      }
      if (!selected) {
        this.chats.push(this.selectedchatdetails)
      }
    }
    return this.selectedchatdetails
  }

  togglediscount(){
    this.discountopen = !this.discountopen
  }

  selectproducttodiscount(product:Product){
    this.producttodiscount = product
  }

  setdiscountedprice(type:string){
    if(type == "percent"){
      if (this.producttodiscount) {
        this.discount.discount_price = (this.discount.discount_percent / 100) * this.producttodiscount.product_price
      }
    }
    if (type == "price") {
      if (this.producttodiscount) {
        if (this.producttodiscount.product_price == 0) {
          this.discount.discount_percent = this.discount.discount_price
        }
        else{
          this.discount.discount_percent = (this.discount.discount_price / this.producttodiscount.product_price) * 100
        }
      }
    }
  }

  getdiscountedprice(price:number){
    return Math.fround((this.discount.discount_percent / 100) * price)
  }

  senddiscount(){
    let productdiscounttosend = {
      type:"product_wt_discount",

    }
  }

  openchat(item:Chats){
    this.selectedchatdetails = item
    this.state = "selected"
  }

  add_image(event:any){
    this.file = event.target.files[0]
  }

  check_unread_messages(){
    let chats = this.selectedchatdetails?.messages
    return chats!.filter((chat: Chat) => chat.status == "unread")
    }

  sendread(){
    this.chatservice.setmessageread(this.check_unread_messages(),this.selectedchatdetails!.user_id)
  }

  send(){
    let message_to_send:Chat = {
      message:this.newmessage,
      sent_from:this.user_id,
      sent_to:this.selectedchatdetails!.user_id,
      status:"",
      send_date_and_time:Date.now().toString()
    }
    this.chatservice.sendmessage(message_to_send)
    this.newmessage = ""
  }

  set_istyping(){
    this.chatservice.settyping(this.selectedchatdetails!.user_id)
  }

  clip(message:string,name=false){
    if(!name)
      return message.slice(0,15)+"..."
    return message.split(" ")[0].slice(0,10)
  }

  closechat(){}

}
