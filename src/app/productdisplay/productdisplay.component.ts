import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { ProductApiService } from '../product-api.service';
import { Product, CartItem } from "../products.model";
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from '../userdata.service';
import { Chats } from '../chat.model';

@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.css']
})
export class ProductdisplayComponent implements OnInit{

  ngOnInit(): void {
    this.actvroute.queryParamMap.subscribe((b)=>{
      let id = b.get("0")
      this.productservice.getproduct(id).subscribe((product)=>{
        this.producttodisplay = product
        this.producttodisplay.product_images.forEach((image)=>{
          if (image == "") {
            this.producttodisplay.product_images.splice(
              this.producttodisplay.product_images.indexOf(image),1)
          }
        })
        this.productservice.searchcategory(this.producttodisplay?.product_category)
          .subscribe((data)=>{
            this.likeproduct = data
          })
        })
    })
    //use store
    /* this.userstate.user_id_sub.subscribe((id)=>{
      this.userid = id
    }) */
  }
  

  constructor(private userstate:UserstateService,
    private productservice:ProductApiService,private actvroute:ActivatedRoute,
    private userdataservice:UserdataService){}

  //work on getting this info form the userstate service pls
  usertype = "buyer"

  userid = ""

  productaddedtocart = false
  productaddedtofavs = false

  producttodisplay!: Product;
  likeproduct: Product[] = []

  basketbuttonstatetext = "Add to Basket"

  qty = 1

  incquantity(){
    if(this.qty == this.producttodisplay?.product_quantity){
      this.qty = this.producttodisplay?.product_quantity
    }else{
      this.qty++
    }
  }

  decquantity(){
    if(this.qty <= 1){
      this.qty = 1
    }else{
      this.qty--
    }
  }

  productimageposcounter = 0

  incimgcounter(){
    if(this.productimageposcounter == this.producttodisplay?.product_images.length!-1){
      this.productimageposcounter = this.producttodisplay?.product_images.length!-1
    }else{
      this.productimageposcounter++
    }
  }

  decimgcounter(){
    if(this.productimageposcounter <= 0){
      this.productimageposcounter = 0
    }else{
      this.productimageposcounter--
    }
  }

  addtocart(){
    let newcartitem:CartItem = {
      cart_id:"",
      quantity:this.qty,
      product_image:"",
      product_name:"",
      product_type:this.producttodisplay?.product_type,
      product_price:this.producttodisplay?.product_price,
      product_id:this.producttodisplay?.product_id,
      has_discount:false, 
      discount_price:0, 
      discount_percent: 0
    }
    this.productservice.additemtocart(this.userid,this.usertype,newcartitem)
    .subscribe((data)=>{
      this.productaddedtocart = data
      this.basketbuttonstatetext = "Added"
    })
  }

  togglefavs(){
    if(!this.productaddedtofavs){
      this.userdataservice.addasfavorite(this.userid,"product",this.producttodisplay?.product_id)
      .subscribe((added)=>{
        this.productaddedtofavs = added
      })
    }
    else{
      this.userdataservice.removefavorite(this.userid,"product",this.producttodisplay?.product_id)
      .subscribe((removed)=>{
        this.productaddedtofavs = !removed
      })
    }
  }

  onscroll(){
    this.productservice.getbuyerproducts()
      .subscribe((products)=>{
        products.forEach((product)=>{
          this.likeproduct.push(product)
        })
        })
  }

  previous(){
    this.userstate.previouspage()
   }

   opennewchat(product:Product){
    let newchat:Chats = {
      messages:[],
      user_id:product.seller_id,
      user_name:product.seller_name,
      user_profile_image:"",
      user_type:"seller",
    }

    //use store
    //this.userstate.newchatuser.next(newchat)
  } 

}
