import { User } from './user.model';

export interface Seller extends User {
  category: string;
  description: string;
  directions: string;
  password: string;
  shop_name: string;
  total_raters?: number;
  total_rating?: number;
}

export interface SellerUpdate {
  category?: string;
  description?: string;
  directions?: string;
  phone_number?: string;
  profile_picture?: string;
  shop_name?: string;
  username?: string;
}
export interface SellerDetails {
  category: string;
  description: string;
  directions: string;
  profile_picture: string;
  shop_name: string;
  total_raters: number | null;
  total_rating: number | null;
  user_status: string;
}
