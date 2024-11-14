import { BuyerUpdate } from './buyer.model';
import { SellerUpdate } from './seller.model';

export interface User {
  email: string;
  id?: number;
  phone_number?: string;
  profile_picture?: string;
  username: string;
}

export interface UserLogin {
  account_type: string;
  email: string;
  password: string;
  username: string;
}

export interface UserLoginResponse {
  current_role: string;
  message: string;
}

export interface UserProfile {
  category?: string;
  description?: string;
  email: string;
  phone_number?: string;
  profile_picture?: string;
  shipping_address?: string;
  shop_name?: string;
  total_raters?: number;
  total_rating?: number;
  username: string;
}

export interface UserProfileUpdate {
  buyer_info?: BuyerUpdate;
  email: string;
  id?: number;
  phone_number?: string;
  seller_info?: SellerUpdate;
}

export interface UpdateProfilePicture {
  profile_picture: File;
}
