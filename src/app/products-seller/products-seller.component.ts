import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { Product,ProductApiService } from '../product-api.service';

@Component({
  selector: 'app-products-seller',
  templateUrl: './products-seller.component.html',
  styleUrls: ['./products-seller.component.css']
})
export class ProductsSellerComponent implements OnInit{

  ngOnInit(): void {
    this.userstate.user_type_sub.subscribe((usertype)=>{
      this.usertype = usertype
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
    })
    this.productservice.getsellerproducts(this.userid).subscribe((products)=>{
      this.sellerproducts = products
    })
  }

  constructor(private userstate:UserstateService,private productservice:ProductApiService){}

  usertype = ""
  userid = ""

  sellerproducts:Product[] = []

  newproductcomponentopen = false

  opennewproductcomponent(){
    this.newproductcomponentopen = true
  }

  setnewproductstate(ev:boolean){
    this.newproductcomponentopen = ev
  }
}
