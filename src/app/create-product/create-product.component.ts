import { Component,Input, OnInit,Output, EventEmitter } from '@angular/core';
import { Product,ProductApiService,Category } from '../product-api.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{

  ngOnInit(): void {
    if(this.edit){
      this.newproduct = this.edit
      this.tag_list = this.edit.tags
      this.category_list = this.newproduct.product_category.split(",")
      this.newproduct.product_images.forEach((image: ImageType) => {
        this.addtoimagesarray(image)
      })
    }
  }

  constructor(private productservice:ProductApiService){}

  @Input()
  seller_id:string = ""

  @Input()
  edit!: Product|undefined;

  @Output() open = new EventEmitter<boolean>()

  removecomponent(){
    this.open.emit(false)
    this.edit = undefined
  }

  types = ["good","service"]

  category_list:Array<string> = []

  catgshow = false

  tag_list:Array<string> = []

  tempproductimages:File[] = []

  image_links:string[] = []

  mergecatgs(catgs:string[]){
    if(this.catgtypeopened == "categories"){
      catgs.forEach((cat)=>{
        this.category_list.push(cat)
      })
    }
    if(this.catgtypeopened == "tags"){
      catgs.forEach((tag)=>{
        this.tag_list.push(tag)
      })
    }
    this.catgshow = false
  }

  removefromcategories(items:string){
    this.category_list.splice(this.category_list.indexOf(items),1)
  }

  removefromtags(items:string){
    this.tag_list.splice(this.tag_list.indexOf(items),1)
  }

  setcatgadd(type:string){
    this.catgtypeopened = type
    this.catgshow = true
  }

  catgtypeopened:string = ""

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
    if(typeof ev == 'string'){
      this.image_links.push("http://localhost/markt_php/uploads/"+ev+"small.jpg")
    }
    else{
      this.tempproductimages.push(ev.target?.files[0])
      let url = URL.createObjectURL(ev.target?.files[0])
      this.image_links.push(url)
    }
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

  Edit(){
    this.newproduct.seller_id = this.seller_id
    this.category_list.forEach((category)=>{
      this.newproduct.product_category += category+","
    })
    this.newproduct.tags = this.tag_list
    this.productservice.editproduct(this.newproduct,this.tempproductimages)
    .subscribe((Responsebody)=>{
      this.removecomponent()
    })
  }

}
