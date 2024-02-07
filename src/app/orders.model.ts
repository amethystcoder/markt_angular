export interface UnacceptedOrders{
    order_id:string,
    seller_id:string,
    product_quantity:number,
    order_date:string,
    product_name:string,
    product_price:number,
    product_id:string,
    product_image:string,
    buyer_id:string,
    buyer_name:string,
    has_discount:boolean,
    discount_price:number,
    discount_percent:number
  }
  
  export interface Orders{
    order_id:string,
    seller_id:string,
    product_quantity:number,
    order_date:string,
    product_name:string,
    product_price:number,
    product_id:string,
    product_image:string,
    buyer_id:string,
    buyer_name:string,
    has_discount:boolean,
    discount_price:number,
    discount_percent:number
  }
  
  export interface DeliveryOrders{
    order_id:string,
    seller_id:string,
    product_quantity:number,
    accepted:boolean,
    received_by_delivery:boolean,
    delivered:boolean,
    order_date:string,
    product_name:string,
    product_price:number,
    product_id:string,
    product_image:string,
    product_size:number,
    buyer_id:string,
    buyer_name:string,
    seller_name:string,
    has_discount:boolean,
    discount_price:number,
    discount_percent:number
  }
  
  export interface BuyerOrders{
    order_id:string,
    seller_id:string,
    seller_shopname:string,
    product_quantity:number,
    order_date:string,
    accepted:boolean,
    declined:boolean,
    delivery_name:string,
    delivery_id:string,
    product_name:string,
    product_price:number,
    product_id:string,
    product_image:string,
    buyer_id:string,
    buyer_name:string,
    received_by_delivery:boolean,
    has_discount:boolean,
    discount_price:number,
    discount_percent:number
  }
  
  export interface SuccessfulOrder{
    seller_id:string,
    product_name:string,
    product_price:string,
    product_quantity:string,
    has_discount:boolean,
    discount_price:number,
    discount_percent:number
  }
  
