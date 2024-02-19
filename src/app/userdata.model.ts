export interface UserProfile{
  email:string, 
  profile_image:string, 
  phone_number:string, 
  house_number:number, 
  street:string, 
  city:string, 
  state:string, 
  country:string, 
  postal_code:number,
  payment:Payment[]
}

export interface Buyer extends UserProfile{
    username:string
  }
  
  export interface Seller extends UserProfile{
    shopname:string, 
    description:string, 
    category:string[], 
    rating:number, 
    directions:string
  }
  
  export interface Delivery extends UserProfile{
    deliveryname:string, 
    vehicle_type:string, 
    working_for_org:boolean,
    org_name:string,
  }
  
  export interface Payment{
    payment_account_first_name:string, 
    payment_account_last_name:string, 
    payment_account_number:number, 
    card_number:string, 
    card_expiry_date:string, 
    cvc:number
  }
  
  export interface Favorite{
    favorite_type:string,
    name:string,
    profile_image:string, 
    favorite_id:string
  }
  
  export interface BuyerUncheckedItems{
    cart_item_number:number,
    order_item_number:number
  }
  
  export interface SellerUncheckedItems{
    unattended_order_item_number:number
  }