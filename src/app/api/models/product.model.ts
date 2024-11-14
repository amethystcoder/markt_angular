export interface Product {
  category: string;
  description: string;
  id: number;
  name: string;
  price: number;
  seller_id: string;
  stock_quantity: number;
}

export interface ProductRequest {
  buyer_id: string;
  category: string;
  created_at?: Date;
  product_description: string;
  status: string;
}
