import { Component, OnInit, inject } from '@angular/core';
import { UserstateService, signalstore } from '../userstate.service';
import { ProductApiService } from '../product-api.service';
import { Product } from "../products.model";

@Component({
  selector: 'app-products-seller',
  templateUrl: './products-seller.component.html',
  styleUrls: ['./products-seller.component.css']
})
export class ProductsSellerComponent implements OnInit{

  ngOnInit(): void {
    this.productservice.getsellerproducts(this.userid).subscribe((products)=>{
      this.sellerproducts = products
    })
  }

  constructor(private userstate:UserstateService,private productservice:ProductApiService){}

  store = inject(signalstore)

  usertype = this.store.user_type()
  userid = this.store.user_id()

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
