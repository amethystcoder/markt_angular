import { Component,Input, OnInit,Output, EventEmitter } from '@angular/core';
import { Product,ProductApiService,Category } from '../product-api.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{

  ngOnInit(): void {
    this.productservice.getcategories().subscribe((categories)=>{
      this.allcategories = categories
    })
    this.productservice.getcategorynames().subscribe((category_names)=>{
      this.maincategories = category_names
    })
  }

  Submit(){
    this.newproduct.seller_id = this.seller_id
    this.category_list.forEach((category)=>{
      this.newproduct.product_category += category+","
    })
    this.newproduct.tags = this.tag_list
    this.productservice.createproduct(this.newproduct,this.tempproductimages)
    .subscribe((Responsebody)=>{
      this.removecomponent()
    })
  }

  constructor(private productservice:ProductApiService){}

  @Input()
  seller_id:string = ""

  @Output() open = new EventEmitter<boolean>()

  removecomponent(){
    this.open.emit(false)
  }

  types = ["good","service"]

  maincategories:string[] = []

  allcategories:Category[] = []

  catgshow = false

  category_list:Array<string> = []

  tag_list:Array<string> = []

  temp_cat_list:Array<string> = []

  temp_tag_list:Array<string> = []

  tempproductimages:File[] = []

  image_links:string[] = []

  addcat(category:string){
    this.temp_cat_list.push(category)
  }

  addtag(tag:string){
    this.temp_tag_list.push(tag)
  }

  mergecatgs(){
    if(this.catgtypeopened == "category"){
      this.temp_cat_list.forEach((cat)=>{
        this.category_list.push(cat)
      })
    }
    if(this.catgtypeopened == "tags"){
      this.temp_tag_list.forEach((tag)=>{
        this.tag_list.push(tag)
      })
    }
    this.temp_cat_list = []
    this.temp_tag_list = []
    this.catgshow = false
  }

  removecatgadd(){
    this.catgshow = false
    this.temp_cat_list = []
    this.temp_tag_list = []
  }

  removefromcategories(items:string){
    this.category_list.splice(this.category_list.indexOf(items),1)
  }

  removefromtags(items:string){
    this.tag_list.splice(this.tag_list.indexOf(items),1)
  }

  catgtypeopened:string = ""

  setcatgadd(val:string){
    this.catgtypeopened = val
    if(this.allcategories.length == 0 || this.maincategories.length == 0){
      this.productservice.getcategorynames().subscribe((data)=>{
        this.maincategories = data
      })
      this.productservice.getcategories().subscribe((data)=>{
        this.allcategories = data
      })
    }
    this.catgshow = true
  }

  newproduct:Product = {
    product_id:"", 
    product_name:"",
    product_type:"",
    product_price:0, 
    product_description:"",
    product_category:"",
    tags:[],
    product_images: [],
    product_quantity:0,
    estimated_size:0,
    seller_id:"",
    seller_name:"",
    desc_under:"",
    favorite:false
  }

  addtoimagesarray(ev:any){
    this.tempproductimages.push(ev.target?.files[0])
    let url = URL.createObjectURL(ev.target?.files[0])
    this.image_links.push(url)
  }

}
