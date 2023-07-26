import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { AppComponent } from './app.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { ProductsSellerComponent } from './products-seller/products-seller.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { BasketComponent } from './basket/basket.component';
import { OrdersSellerComponent } from './orders-seller/orders-seller.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserAccountDetailsComponent } from './user-account-details/user-account-details.component';
import { DeliveryOrdersComponent } from './delivery-orders/delivery-orders.component';
import { PendingDeliveriesComponent } from './pending-deliveries/pending-deliveries.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { BuyerQueryComponent } from './buyer-query/buyer-query.component';

const routes: Routes = [
  {path:"new",component:SignupComponent},
  {path:"home",component:HomeComponent},
  {path:"marketplace",component:MarketplaceComponent},
  {path:"display",component:ProductdisplayComponent},
  {path:"products/seller",component:ProductsSellerComponent},
  {path:"userauth",component:LoginUserComponent},
  {path:"basket",component:BasketComponent},
  {path:"orders/seller",component:OrdersSellerComponent},
  {path:"favorites",component:FavoritesComponent},
  {path:"account",component:UserAccountDetailsComponent},
  {path:"orders/delivery",component:DeliveryOrdersComponent},
  {path:"pendingorders/delivery",component:PendingDeliveriesComponent},
  {path:"ordertrack",component:TrackOrderComponent},
  {path:"sellerview",component:SellerPageComponent},
  {path:"passwordretrieval",component:RetrievePasswordComponent},
  {path:"buyer/productqueries",component:BuyerQueryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
