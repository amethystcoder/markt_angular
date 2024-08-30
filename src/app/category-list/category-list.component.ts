import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Category } from "../products.model";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{

  constructor(private productservice:ProductApiService){}

  ngOnInit(): void {
    this.productservice.getcategorynames().subscribe((data)=>{
      this.maincategories = data.categories
    })
    this.productservice.getcategories().subscribe((data)=>{
      this.allcategories = data.categories
    })
  }

  @Input() state:string = ""
  @Output() lister = new EventEmitter<string[]>()

  temp_tag_list:Array<string> = []

  temp_cat_list:Array<string> = []

  allcategories:Category[] = []
  maincategories:string[] = []

  addcat(category:string){
    this.temp_cat_list.push(category)
  }

  addtag(tag:string){
    this.temp_tag_list.push(tag)
  }

  removecatgadd(){
    this.temp_cat_list = []
    this.temp_tag_list = []
    this.lister.emit([])
  } 

  mergecatgs(){
    if(this.state == "categories"){
      this.lister.emit(this.temp_cat_list)
    }
    if(this.state == "tags"){
      this.lister.emit(this.temp_tag_list)
    }
  }

}
