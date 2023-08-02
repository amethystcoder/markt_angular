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

  toedit!: Product|undefined;

  sellerproducts:Product[] = []

  newproductcomponentopen = false

  opennewproductcomponent(){
    this.newproductcomponentopen = true
  }

  edit_product(item:Product){
    this.toedit = item
    this.opennewproductcomponent()
  }

  delete_product(item:Product){
    this.productservice.deleteproduct(this.userid,item.product_id).subscribe((deleted)=>{
      if(deleted){
        this.sellerproducts.splice(this.sellerproducts.indexOf(item),1)
      }
    })
  }

  setnewproductstate(ev:boolean){
    this.newproductcomponentopen = ev
    this.toedit = undefined
  }
}
