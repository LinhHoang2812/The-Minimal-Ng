import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterComponent } from './pages/register/register.component';

import { SigninComponent } from './pages/signin/signin.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SingleProductPageComponent } from './pages/single-product-page/single-product-page.component';
import { UserComponent } from './pages/User/user/user.component';
import { WishlistComponent } from './pages/User/wishlist/wishlist.component';
import { OrderComponent } from './pages/User/order/order.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import {
  CheckoutGuard,
  PaymentCompleteGuard,
  PaymentGuard,
  authGuard,
  authGuardGuard,
} from './auth-guard.guard';

import { CartSectionComponent } from './pages/CartSection/cart-section/cart-section.component';
import { PaymentComponent } from './pages/CartSection/payment/payment.component';
import { CheckoutComponent } from './pages/CartSection/checkout/checkout.component';
import { CartComponent } from './pages/CartSection/cart/cart.component';
import { PaymentCompleteComponent } from './pages/CartSection/payment-complete/payment-complete.component';
import { ProfileComponent } from './pages/User/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'products/:id',
    component: SingleProductPageComponent,
  },
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'cart',
    component: CartSectionComponent,
    canActivateChild: [authGuardGuard],
    children: [
      {
        path: '',
        component: CartComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [CheckoutGuard],
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [PaymentGuard],
      },
      {
        path: 'complete',
        component: PaymentCompleteComponent,
        canActivate: [PaymentCompleteGuard],
      },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivateChild: [authGuardGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfileComponent,
      },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'order', component: OrderComponent },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
