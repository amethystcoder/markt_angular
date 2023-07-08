import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgOptimizedImage } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SearchComponent } from './search/search.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { ProductsSellerComponent } from './products-seller/products-seller.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { SafePipe } from './safe.pipe';
import { LoginUserComponent } from './login-user/login-user.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BasketComponent } from './basket/basket.component';
import { OrdersSellerComponent } from './orders-seller/orders-seller.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserAccountDetailsComponent } from './user-account-details/user-account-details.component';
import { DeliveryOrdersComponent } from './delivery-orders/delivery-orders.component';
import { PendingDeliveriesComponent } from './pending-deliveries/pending-deliveries.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { ChatComponent } from './chat/chat.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    SidebarComponent,
    MarketplaceComponent,
    TopbarComponent,
    SearchComponent,
    ProductdisplayComponent,
    ProductsSellerComponent,
    CreateProductComponent,
    SafePipe,
    LoginUserComponent,
    BasketComponent,
    OrdersSellerComponent,
    FavoritesComponent,
    UserAccountDetailsComponent,
    DeliveryOrdersComponent,
    PendingDeliveriesComponent,
    TrackOrderComponent,
    SellerPageComponent,
    RetrievePasswordComponent,
    ChatComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
