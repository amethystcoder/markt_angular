export interface Category{
    name: string,
        tags:[
            {
              name:string,
            descs:Array<string>
          },
            ]
  }

  export interface Catg{
    categories: Array<any>
  }

  export interface Product{
    product_id:string,
    product_name:string,
    product_type:string,
    product_price:number,
    product_description:string,
    product_category:string,
    tags:Array<string>,
    product_images: Array<string>,
    product_quantity:number,
    estimated_size:number,
    seller_id:string,
    seller_name:string,
    desc_under:string,
    favorite: boolean
  }

  export interface CartItem{
    cart_id:string,
    product_image:string,
    product_name:string,
    product_type:string,
    product_price:number,
    product_id:string,
    quantity:number,
    has_discount:boolean,
    discount_price:number,
    discount_percent:number
  }

  export interface ProductQuery{
    query_id:string,
    buyer_id:string,
    buyer_name:string,
    city:string,
    state:string,
    date_created:string,
    message:string,
    category:string,
    stale_time:number,
    profile_image:string
  }
