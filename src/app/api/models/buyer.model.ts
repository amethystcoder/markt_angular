import { User } from './user.model';

export interface Buyer extends User {
  password: string;
  shipping_address: string;
}

export interface BuyerUpdate {
  phoneNumber?: string;
  profilePicture?: string;
  shipping_address?: string;
  username?: string;
}

export interface BuyerDetails {
  buyername: string;
  id: number;
  profile_picture: string;
  shipping_address: string;
  user_status: string;
}
