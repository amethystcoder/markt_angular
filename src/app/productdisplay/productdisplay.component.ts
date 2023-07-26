import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { Product, ProductApiService,CartItem } from '../product-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.css']
})
export class ProductdisplayComponent implements OnInit{

  ngOnInit(): void {
    let productid = this.actvroute.snapshot.queryParamMap.get("0")
    this.productservice.getproduct(productid).subscribe((product)=>{
      this.producttodisplay = product
      this.productservice.searchcategory(this.producttodisplay?.product_category)
        .subscribe((data)=>{
          this.likeproduct = data
        })
    })
    this.userstate.user_id_sub.subscribe((id)=>{
      this.userid = id
    })
  }

  constructor(private userstate:UserstateService,
    private productservice:ProductApiService,private actvroute:ActivatedRoute){}

  //work on getting this info form the userstate service pls
  usertype = "buyer"

  userid = ""

  productaddedtocart = false

  producttodisplay!: Product;
  likeproduct: Product[] = []

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
      product_id:this.producttodisplay?.product_id
    }
    this.productservice.additemtocart(this.userid,this.usertype,newcartitem)
    .subscribe((data)=>{
      this.productaddedtocart = data
    })
  }

  onscroll(){
    this.productservice.getbuyerproducts()
      .subscribe((products)=>{
        products.forEach((product)=>{
          this.likeproduct.push(product)
        })
        })
  }

}
