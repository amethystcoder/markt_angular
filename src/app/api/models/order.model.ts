export interface Order {
  buyer_id: string;
  delivery_address: string;
  id: number;
  order_date?: Date;
  order_status: string;
  product_id: string;
  quantity: number;
  seller_id: string;
  total_price: number;
}
