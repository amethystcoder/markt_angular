import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Product } from "../products.model";
import { UserstateService, signalstore } from '../userstate.service';
import { Search } from '../search/search.component';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit{

  ngOnInit(): void {
    this.searchproduct()
    this.catgunder = ""
  }

  constructor(private userstate:UserstateService,private productservice:ProductApiService){ }

  store = inject(signalstore)
  usertype = this.store.user_type

  searchproduct(det:Search|null = null){
    if(det === null){
      this.productservice.getbuyerproducts()
      .subscribe((products)=>{
            this.marketplaceproducts = products
        })
    }
    if(det?.searchquery == "" && det?.searchcat == ""){
      this.catgunder = det?.searchcat
      this.productservice.getbuyerproducts()
      .subscribe((products)=>{
            this.marketplaceproducts = products
        })
    }
    if(det?.searchquery != "" && det?.searchcat == ""){
      this.catgunder = det?.searchcat
      this.productservice.searchproduct(det.searchquery)
      .subscribe((products)=>{
            this.marketplaceproducts = products
        })
    }
    if(det?.searchquery == "" && det?.searchcat != ""){
      this.catgunder = det?.searchcat
      this.productservice.searchcategory(det.searchcat)
      .subscribe((products)=>{
            this.marketplaceproducts = products
        })
    }
    if(det?.searchquery != "" && det?.searchcat != ""){
      this.catgunder = det?.searchcat
      this.productservice.searchproductwithcategory(det?.searchquery,det?.searchcat)
      .subscribe((products)=>{
            this.marketplaceproducts = products
        })
    }
  }

  catgunder:string|undefined = ""
  marketplaceproducts:Product[] = []

  onscroll(): void{
    this.productservice.getbuyerproducts()
      .subscribe((products)=>{
        products.forEach((product)=>{
          this.marketplaceproducts.push(product)
        })
        })
  }

}
