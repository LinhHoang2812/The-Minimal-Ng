import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavAnnimationDirective } from './directive/nav-annimation.directive';
import { MatListModule } from '@angular/material/list';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CarouselModule } from '@coreui/angular';
import { TabsModule } from '@coreui/angular';
import { TextAnimationDirective } from './directive/text-animation.directive';
import { SigninComponent } from './pages/signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatDividerModule } from '@angular/material/divider';
import { NewArrivalComponent } from './components/homepageComponents/new-arrival/new-arrival.component';
import { HeroComponent } from './components/homepageComponents/hero/hero.component';
import { SuggestComponent } from './components/homepageComponents/suggest/suggest.component';
import { MatChipsModule } from '@angular/material/chips';
import { FilterFormComponent } from './components/productsPageComponents/filter-form/filter-form.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductsComponent } from './components/productsPageComponents/products/products.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CdkMenu, CdkMenuTrigger, CdkMenuItem } from '@angular/cdk/menu';
import { ImgModule } from '@coreui/angular';
import { SingleProductPageComponent } from './pages/single-product-page/single-product-page.component';
import { ProductInfoComponent } from './components/singleProductComponents/product-info/product-info.component';
import { ProductPhotosComponent } from './components/singleProductComponents/product-photos/product-photos.component';
import { ProductDetailComponent } from './components/singleProductComponents/product-detail/product-detail.component';
import { ProductFormComponent } from './components/singleProductComponents/product-form/product-form.component';
import { CdkListboxModule, CdkOption } from '@angular/cdk/listbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTabComponent } from './components/singleProductComponents/product-tab/product-tab.component';
import { CdkTableModule } from '@angular/cdk/table';
import { SimilarProductsComponent } from './components/singleProductComponents/similar-products/similar-products.component';

import { UserComponent } from './pages/User/user/user.component';
import { WishlistComponent } from './pages/User/wishlist/wishlist.component';
import { OrderComponent } from './pages/User/order/order.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { WishlistItemComponent } from './components/wishlistComponents/wishlist-item/wishlist-item.component';
import { CartItemComponent } from './components/cartComponents/cart-item/cart-item.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartSectionComponent } from './pages/CartSection/cart-section/cart-section.component';
import { PaymentComponent } from './pages/CartSection/payment/payment.component';
import { CheckoutComponent } from './pages/CartSection/checkout/checkout.component';
import { AddressComponent } from './components/address/address.component';
import { MiniCartItemComponent } from './components/cartComponents/mini-cart-item/mini-cart-item.component';
import { CartSelectComponent } from './components/cartComponents/cart-select/cart-select.component';
import { CartComponent } from './pages/CartSection/cart/cart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from './environment';
import { PaymentCompleteComponent } from './pages/CartSection/payment-complete/payment-complete.component';
import { ProfileComponent } from './pages/User/profile/profile.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SingleOrderComponent } from './components/orderComponents/single-order/single-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    LogoComponent,
    NavAnnimationDirective,
    TextAnimationDirective,
    SigninComponent,
    NewArrivalComponent,
    HeroComponent,
    SuggestComponent,
    FilterFormComponent,
    ProductsComponent,
    ProductsPageComponent,
    SingleProductPageComponent,
    ProductInfoComponent,
    ProductPhotosComponent,
    ProductDetailComponent,
    ProductFormComponent,
    ProductTabComponent,
    SimilarProductsComponent,
    CartComponent,
    UserComponent,
    WishlistComponent,
    OrderComponent,
    NotFoundPageComponent,
    WishlistItemComponent,
    CartItemComponent,
    CartSectionComponent,
    PaymentComponent,
    CheckoutComponent,
    AddressComponent,
    MiniCartItemComponent,
    CartSelectComponent,
    PaymentCompleteComponent,
    ProfileComponent,
    SingleOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    CdkAccordionModule,
    CarouselModule,
    TabsModule,
    HttpClientModule,
    SlickCarouselModule,
    MatDividerModule,
    MatChipsModule,
    MatSliderModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    CdkMenu,
    CdkMenuTrigger,
    CdkMenuItem,
    ImgModule,
    CdkListboxModule,
    CdkOption,
    MatTabsModule,
    CdkTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgxStripeModule.forRoot(environment.stripe.publicKey),
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
