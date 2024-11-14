export interface Cart {
  buyer_id: string;
  cart_id: string;
  discount_percent?: number;
  discount_price?: number;
  has_discount?: boolean;
  product_id: string;
  quantity: number;
}
