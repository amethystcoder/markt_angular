import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { CartItem, Category, Product, ProductQuery, Catg } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  //[x: string]: any;

  constructor(private http:HttpClient) { }

  url = "http://localhost:5000"

  getcategorynames(){
    return this.http.get<Catg>(`${this.url}/products/categories/categorynames`)
    .pipe(
      retry(1)
    )
  }

  getcategories(){
    return this.http.get<Catg>(`${this.url}/products/categories/all`)
    .pipe(
      retry(1)
    )
  }

  getsellerproducts(seller:string|null){
    let produrl = `${this.url}/products/seller/${seller}`
    return this.http.get<Array<Product>>(produrl)
    .pipe(
      retry(1),
      map((product)=>{
        product.forEach((prod)=>{
          prod.favorite = false
        })
        return product
      })
      //catchError()
    )
  }

  getbuyerproducts(){
    return this.http.get<Product[]>(`${this.url}/products/random/20`)
    .pipe(
      retry(1),
      map((product)=>{
        product.forEach((prod)=>{
          prod.favorite = false
        })
        return product
      })
    )
  }

  searchproduct(name:string){
    return this.http.get<Product[]>(`${this.url}/products/search/${name}`)
    .pipe(
      retry(1),
      map((product)=>{
        product.forEach((prod)=>{
          prod.favorite = false
        })
        return product
      })
    )
  }

  searchcategory(name:string|undefined){
    return this.http.get<Product[]>(`${this.url}/products/category/search/${name}`)
    .pipe(
      retry(1),
      map((product)=>{
        product.forEach((prod)=>{
          prod.favorite = false
        })
        return product
      })
    )
  }

  //the route for this does not exist so i am using this one in its stead
  //the route is supposed to search for a product with a particular name that is also in a particular category
  searchproductwithcategory(name:string|undefined,category:string|undefined){
    return this.http.get<Product[]>(`${this.url}/products/category/search/${name}`)
    .pipe(
      retry(1),
      map((product)=>{
        product.forEach((prod)=>{
          prod.favorite = false
        })
        return product
      })
    )
  }

  getproduct(product_id:string|null){
    return this.http.get<Product>(`${this.url}/products/${product_id}`)
    .pipe(
      retry(1)
    )
  }

  createproduct(product:Product,images:File[]){
    let formdata = new FormData()
    formdata.append("product_name",product.product_name)
    formdata.append("product_type",product.product_type)
    formdata.append("product_price",product.product_price.toString())
    formdata.append("product_description",product.product_description)
    formdata.append("product_category",product.product_category)
    formdata.append("tags",product.tags.toString())
    formdata.append("product_quantity",product.product_quantity.toString())
    formdata.append("estimated_size",product.estimated_size.toString())
    formdata.append("seller_id",product.seller_id)
    formdata.append("desc_under",product.desc_under)
    let n = 1
    images.forEach((image)=>{
      formdata.append("product_image"+n.toString(),image)
      n++
    })
    return this.http.post(`${this.url}/products/new`,formdata)
    .pipe(
      retry(1)
    )
  }

  editproduct(product:Product,images:File[]){
    let formdata = new FormData()
    formdata.append("product_id",product.product_id)
    formdata.append("product_name",product.product_name)
    formdata.append("product_type",product.product_type)
    formdata.append("product_price",product.product_price.toString())
    formdata.append("product_description",product.product_description)
    formdata.append("product_category",product.product_category)
    formdata.append("tags",product.tags.toString())
    formdata.append("product_quantity",product.product_quantity.toString())
    formdata.append("estimated_size",product.estimated_size.toString())
    formdata.append("seller_id",product.seller_id)
    formdata.append("desc_under",product.desc_under)
    let n = 1
    images.forEach((image)=>{
      formdata.append("product_image"+n.toString(),image)
      n++
    })
    return this.http.put(`${this.url}/products/${product.product_id}`,formdata)
    .pipe(
      retry(1)
    )
  }

  getbuyerbasketitems(buyerid:string,usertype:string){
    return this.http.get<CartItem[]>(
      `${this.url}/cart/${buyerid}`)
    .pipe(
      retry(1)
    )
  }

  additemtocart(buyerid:string,usertype:string,item:CartItem):Observable<boolean>{
    let cartdata = new FormData()
    cartdata.append("user_id",buyerid)
    cartdata.append("user_type",usertype)
    cartdata.append("product_id",item.product_id)
    cartdata.append("quantity",item.quantity.toString())
    cartdata.append("has_discount",(item.has_discount)? `1` : `0`)
    cartdata.append("discount_price",item.discount_price.toString())
    cartdata.append("discount_percent",item.discount_percent.toString())
    return this.http.post<boolean>(`${this.url}/cart/`,cartdata)
    .pipe(
      retry(1)
    )
  }

  //we need to make sure only the owner i.e buyer can remove items from cart
  removeitemfromcart(buyerid:string,cart_id:string){
    return this.http.delete(
      `${this.url}/cart/${cart_id}`)
    .pipe(
      retry(1)
    )
  }

  createproductquery(message:string,buyer_id:string,category:string[]){
    let querydata = new FormData()
    querydata.append("buyer_id",buyer_id)
    querydata.append("message",message)
    querydata.append("category",category.toString())
    return this.http.post<boolean>(`${this.url}/product_request/new`,querydata)
    .pipe(
      retry(1)
    )
  }

  getqueriesthroughcategory(category:string[]){
    let categories_concatd = ""
    category.forEach((catg)=>{
      categories_concatd += catg
      categories_concatd += "+"
    })
    return this.http.get(
      `${this.url}/product_request/category/${categories_concatd}`)
    .pipe(
      retry(1)
    )
  }

  getbuyerqueries(buyer_id:string){
    return this.http.get<ProductQuery[]>(
      `${this.url}/product_request/${buyer_id}`)
    .pipe(
      retry(1)
    )
  }

  getsellerqueries(seller_id:string){
    return this.http.get<ProductQuery[]>(
      `${this.url}/product_request/${seller_id}`)
    .pipe(
      retry(1)
    )
  }

  //need to make sure it is the owner of the product i.e the seller that is the one deleting the product
  deleteproduct(seller_id:string,product_id:string){
    let productdata = new FormData()
    productdata.append("seller_id",seller_id)
    productdata.append("product_id",product_id)
    return this.http.delete<boolean>(`${this.url}/products/${product_id}`)
    .pipe(
      retry(1)
    )
  }

}
