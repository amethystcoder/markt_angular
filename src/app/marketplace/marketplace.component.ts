import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Product } from "../products.model";
import { UserstateService, signalstore } from '../userstate.service';
import { Search } from '../search/search.component';
import { Observable, merge, tap } from 'rxjs';

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
      this.marketplaceproducts = this.productservice.getbuyerproducts()
    }
    if(det?.searchquery == "" && det?.searchcat == ""){
      this.catgunder = det?.searchcat
      this.marketplaceproducts = this.productservice.getbuyerproducts()
    }
    if(det?.searchquery != "" && det?.searchcat == ""){
      this.catgunder = det?.searchcat
      this.marketplaceproducts = this.productservice.searchproduct(det.searchquery)
    }
    if(det?.searchquery == "" && det?.searchcat != ""){
      this.catgunder = det?.searchcat
      this.marketplaceproducts = this.productservice.searchcategory(det.searchcat)
    }
    if(det?.searchquery != "" && det?.searchcat != ""){
      this.catgunder = det?.searchcat
      this.marketplaceproducts = this.productservice.searchproductwithcategory(det?.searchquery,det?.searchcat)
    }
  }

  catgunder:string|undefined = ""
  marketplaceproducts!: Observable<Product[]>;

  onscroll(): void{
    /* merge(this.marketplaceproducts,this.productservice.getbuyerproducts())
    .pipe() */
    this.productservice.getbuyerproducts()
      .subscribe((products)=>{
        this.marketplaceproducts.pipe(
          tap((productlist)=>{
            productlist = [...productlist, ...products]
          })
        )
        })
  }

}
