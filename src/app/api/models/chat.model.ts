export interface ChatMessage {
  content: string;
  id?: number;
  is_product_share?: boolean;
  product_id?: number;
  room_id: number;
  sender_id: number;
  timestamp?: Date;
}

export interface ChatRoom {
  buyer_id: number;
  created_at?: Date;
  id?: number;
  seller_id: number;
}
