import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { CartItem, Category, Product, ProductQuery } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  //[x: string]: any;

  constructor(private http:HttpClient) { }

  getcategorynames(){
    return this.http.get<Array<string>>("http://localhost/markt_php/categories_add.php?type=main_names")
    .pipe(
      retry(1)
    )
  }

  getcategories(){
    return this.http.get<Array<Category>>("http://localhost/markt_php/categories_add.php?type=all")
    .pipe(
      retry(1)
    )
  }

  getsellerproducts(seller:string|null){
    let produrl = `http://localhost/markt_php/get_products.php?type=seller_products&seller_id=${seller}`
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
    return this.http.get<Product[]>("http://localhost/markt_php/get_products.php?type=getrandom&amount=12")
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
    return this.http.get<Product[]>(`http://localhost/markt_php/get_products.php?type=search&
                                                              product_name=${name}&start_idx=0`)
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
    return this.http.get<Product[]>(`http://localhost/markt_php/get_products.php?type=category&
                                                          product_category=${name}&start_idx=0`)
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

  searchproductwithcategory(name:string|undefined,category:string|undefined){
    return this.http.get<Product[]>(`http://localhost/markt_php/get_products.php?type=category&
                                                          product_name=${name}&product_category=${category}&
                                                          start_idx=0`)
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
    return this.http.get<Product>(`http://localhost/markt_php/get_products.php?type=single&product_id=${product_id}`)
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
    return this.http.post("http://localhost/markt_php/sellerproductset.php",formdata)
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
    return this.http.post("http://localhost/markt_php/sellerproductedit.php",formdata)
    .pipe(
      retry(1)
    )
  }

  getbuyerbasketitems(buyerid:string,usertype:string){
    return this.http.get<CartItem[]>(
      `http://localhost/markt_php/get_cart_items.php?user_id=${buyerid}&user_type=${usertype}`)
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
    return this.http.post<boolean>("http://localhost/markt_php/add_to_cart.php",cartdata)
    .pipe(
      retry(1)
    )
  }

  removeitemfromcart(buyerid:string,cart_id:string){
    return this.http.get(
      `http://localhost/markt_php/remove_from_cart.php?user_id=${buyerid}&cart_id=${cart_id}`)
    .pipe(
      retry(1)
    )
  }

  createproductquery(message:string,buyer_id:string,category:string[]){
    let querydata = new FormData()
    querydata.append("buyer_id",buyer_id)
    querydata.append("message",message)
    querydata.append("category",category.toString())
    return this.http.post<boolean>("http://localhost/markt_php/create_product_query.php",querydata)
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
      `http://localhost/markt_php/get_product_queries.php?type=category&categories=${categories_concatd}`)
    .pipe(
      retry(1)
    )
  }

  getbuyerqueries(buyer_id:string){
    return this.http.get<ProductQuery[]>(
      `http://localhost/markt_php/get_product_queries.php?type=buyer&buyer_id=${buyer_id}`)
    .pipe(
      retry(1)
    )
  }

  getsellerqueries(seller_id:string){
    return this.http.get<ProductQuery[]>(
      `http://localhost/markt_php/get_product_queries.php?type=seller&seller_id=${seller_id}`)
    .pipe(
      retry(1)
    )
  }

  deleteproduct(seller_id:string,product_id:string){
    let productdata = new FormData()
    productdata.append("seller_id",seller_id)
    productdata.append("product_id",product_id)
    return this.http.post<boolean>("http://localhost/markt_php/delete_product.php",productdata)
    .pipe(
      retry(1)
    )
  }

}
