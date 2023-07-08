import { Component, OnInit } from '@angular/core';
import { Seller,UserdataService } from '../userdata.service';
import { Product, ProductApiService } from '../product-api.service';
import { ActivatedRoute } from '@angular/router';
import { ChatApiService,Comment, Review } from '../chat-api.service';
import { UserstateService } from '../userstate.service';

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
    this.userstate.user_name_sub.subscribe((data)=>{
      this.username = data
    })
    this.commentservice.getcommentsandrating(this.sellerid,"Seller").subscribe((data)=>{
      this.seller_review = data
    })
  }

  sellerid = ""
  username = ""

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
