import { Address } from './address.model';
import { Buyer } from './buyer.model';
import { Seller } from './seller.model';

export interface BuyerRegister extends Buyer {
  address?: Address;
}

export interface SellerRegister extends Seller {
  address?: Address;
}
