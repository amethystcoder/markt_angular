import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductApiService,Product } from '../product-api.service';
import { UserstateService } from '../userstate.service';
import { Search } from '../search/search.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent {
  isLoading: boolean = true; // Set it to true when you want to show the loader

  // Example function to simulate data loading
  loadData() {
    this.isLoading = true;
    // Your data loading logic here
    setTimeout(() => {
      this.isLoading = false; // Set it to false when data loading is complete
    }, 2000); // Simulating a delay of 2 seconds
  }
}

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

  //work on getting this info form the userstate service pls
  usertype = "buyer"

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
