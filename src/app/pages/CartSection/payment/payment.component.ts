import { Component, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { CartItem } from 'src/app/models/database.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  cartList: CartItem[];
  isLoading: boolean = false;
  paymentError: string;
  mdScreen: boolean;
  @ViewChild(StripeCardNumberComponent) cardNumber: StripeCardNumberComponent;

  constructor(
    public screen: ScreenServiceService,
    public auth: AuthServiceService,
    public firebaseAuth: FirebaseAuthServiceService,
    private stripe: StripeService,
    private router: Router
  ) {}
  ngOnInit() {
    this.screen.cartStep = 3;
    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });

    this.auth.getAddress();
    this.firebaseAuth.getCart().subscribe((data: CartItem[]) => {
      this.cartList = data;
    });
  }
  checkout() {
    this.isLoading = true;
    if (this.auth.user.value?.token) {
      this.stripe.createToken(this.cardNumber.element).subscribe((token) => {
        if (token.token) {
          this.firebaseAuth
            .addOrder({
              items: this.cartList,
              amount: this.firebaseAuth.totalPrice,
              paid: true,
              createdAt: new Date(),
            })
            .subscribe(() => {
              this.firebaseAuth.deleteUserCart().subscribe(() => {
                this.firebaseAuth.isCartChange.next(true);
                this.isLoading = false;
                this.router.navigateByUrl('/cart/complete');
              });
            });

          return;
        }
        this.isLoading = false;
        this.paymentError = token.error.message;
      });

      return;
    }
    this.isLoading = false;
    this.router.navigateByUrl('/login');
  }
}
