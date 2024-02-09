import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { ProductApiService } from '../product-api.service';
import { ActivatedRoute } from '@angular/router';
import { ChatApiService } from '../chat-api.service';
import { UserstateService } from '../userstate.service';
import { Seller } from '../userdata.model';
import { Product } from '../products.model';
import { Review, Comment, Chats } from '../chat.model';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit{

  constructor(private userdata:UserdataService,private productservice:ProductApiService,
    private actvroute:ActivatedRoute,private commentservice:ChatApiService,private userstate:UserstateService){}

  ngOnInit(): void {
    let sellerid = this.actvroute.snapshot.queryParamMap.get("0")
    this.sellerid = sellerid!.toString() 
    this.userdata.getsellerdata(sellerid).subscribe((data)=>{
      this.sellertoview = data
    })
    this.productservice.getsellerproducts(sellerid).subscribe((data)=>{
      this.sellerproducts = data
    })
    //use store
    /* this.userstate.user_name_sub.subscribe((data)=>{
      this.username = data
    })
    this.userstate.user_id_sub.subscribe((data)=>{
      this.userid = data
    }) */
    this.commentservice.getcommentsandrating(this.sellerid,"Seller").subscribe((data)=>{
      this.seller_review = data
    })
  }

  userid = ""
  sellerid = ""
  username = ""

  selleraddedtofavs = false

  sellertoview!: Seller
  sellerproducts:Product[] = []
  seller_review!:Review

  usercomment = ""
  userrating = 0

  rateProduct(rateValue: number) {
    this.userrating = rateValue
  }

  togglefav(item:Product){
    item.favorite = !item.favorite
  }

  previous(){
    this.userstate.previouspage()
   }

  togglefavs(){
  if(!this.selleraddedtofavs){
    this.userdata.addasfavorite(this.userid,"seller",this.sellerid)
    .subscribe((added)=>{
      this.selleraddedtofavs = added
    })
  }
  else{
    this.userdata.removefavorite(this.userid,"seller",this.sellerid)
    .subscribe((removed)=>{
      this.selleraddedtofavs = !removed
    })
  }
}

opennewchat(seller:Seller){
  let newchat:Chats = {
    messages:[],
    user_id:this.sellerid,
    user_name:seller.shopname,
    user_profile_image:"",
    user_type:"seller",
  }
  //use store
  //this.userstate.newchatuser.next(newchat)
} 

  comment: Comment = {
    comment_body:"",
    comment_place: "Seller",
    comment_place_id: "",
    comment_title:"",
    commenter:"",
    rating:0
  }

  getratevalclass(rateVal:number){
    return rateVal <= this.userrating
  }

  submitrating(): void{
    this.comment.comment_body = this.usercomment
    this.comment.comment_place = "Seller"
    this.comment.comment_place_id = this.sellerid
    this.comment.comment_title = ""
    this.comment.commenter = this.username
    this.comment.rating = this.userrating
    this.commentservice.rateandcomment(this.comment).subscribe((result)=>{
      if(result){
        this.seller_review.comments.push(result)
        this.usercomment = ""
      }
    })
  }

}
