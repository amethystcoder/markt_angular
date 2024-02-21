import { Component, OnInit,EventEmitter, Output, OnDestroy } from '@angular/core';
import { ProductApiService } from '../product-api.service';


export interface Search{
  searchcat:string,
  searchquery:string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {

  ngOnInit(): void {
    this.productapi.getcategorynames()
    .subscribe((categories)=>{
      this.categories = categories
    })
  }

  ngOnDestroy(): void {
      clearInterval(this.searchkeywordinterval)
  }
  constructor(private productapi:ProductApiService){
    this.searchkeywordinterval = setInterval(()=>{
      if(this.inc == this.placeholders.length - 1){
        this.inc = 0
      }
      else{
        this.inc++
      }
      this.placeholder = this.placeholders[this.inc]
    },3000)
  }

  searchkeywordinterval
  inc = 0

  placeholder = "search product"

  placeholders = ["shampoo", "bag of rice", "acoustic guitar", "gold necklace", "xbox 360"]

  categories:string[] = []

  @Output() search = new EventEmitter<Search>()

  searchquery:string = ""
  searchcat:string = ""

  setcatgory(category:string){
    this.searchcat = category === "all" ? "" : category
    this.searchproduct()
  }

  searchproduct(){
    let newsearch:Search = {
      searchquery:this.searchquery,
      searchcat:this.searchcat
    }
    this.search.emit(newsearch)
  }

}
