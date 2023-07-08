import { Component, OnInit,EventEmitter, Output } from '@angular/core';
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
export class SearchComponent implements OnInit {

  ngOnInit(): void {
    this.productapi.getcategorynames()
    .subscribe((categories)=>{
      this.categories = categories
    })
  }
  constructor(private productapi:ProductApiService){}

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
