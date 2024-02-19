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

export interface UnacceptedOrders extends Orders{}

export interface DeliveryOrders extends Orders{
  accepted:boolean,
  received_by_delivery:boolean,
  delivered:boolean,
  product_size:number,
  seller_name:string
}
  
export interface BuyerOrders extends Orders{
  seller_shopname:string,
  accepted:boolean,
  declined:boolean,
  delivery_name:string,
  delivery_id:string,
  received_by_delivery:boolean
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
  
