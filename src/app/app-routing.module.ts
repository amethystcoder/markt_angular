import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
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
import { routeGuards } from './route-guards';

const routes: Routes = [
  {path:"",redirectTo:"marketplace",pathMatch:"full"},
  {path:"new",component:SignupComponent},
  {path:"home",
    //loadComponent: ()=> import(),
    component:HomeComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard],
    canMatch:[()=>inject(routeGuards).usermatch]
  },
  {path:"home",
    //loadComponent: ()=> import(),
    component:SellerHomeComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  },
  {path:"marketplace",component:MarketplaceComponent},
  {path:"display",component:ProductdisplayComponent},
  {
    path:"products/seller",component:ProductsSellerComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  },
  {path:"userauth",component:LoginUserComponent},
  {
    path:"basket",component:BasketComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  },
  {
    path:"orders/seller",component:OrdersSellerComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  },
  {
    path:"favorites",component:FavoritesComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  },
  {
    path:"account",component:UserAccountDetailsComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  },
  {
    path:"orders/delivery",component:DeliveryOrdersComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  },
  {
    path:"pendingorders/delivery",component:PendingDeliveriesComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  },
  {path:"ordertrack",component:TrackOrderComponent},
  {path:"sellerview",component:SellerPageComponent},
  {path:"passwordretrieval",component:RetrievePasswordComponent},
  {
    path:"buyer/productqueries",component:BuyerQueryComponent,
    canActivate:[()=>inject(routeGuards).LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
