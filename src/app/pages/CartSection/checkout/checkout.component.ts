import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';
import { CartItem } from 'src/app/models/database.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cartList: CartItem[];
  mdScreen: boolean;
  shippingOptions = [
    { name: 'Standard Shipping', price: 5, des: '5-7 working days' },
    { name: 'Express Shipping', price: 9, des: '2-3 working days' },
  ];
  paymentOptions = [
    {
      name: 'Visa Card',
      img: 'https://img.ltwebstatic.com/images3_pi/2021/03/09/161528368123dd7a35ad8708b0dfc74b3630526891.png',
      number: 4242424242424242,
    },
    {
      name: 'Master Card',
      img: 'https://img.ltwebstatic.com/images2_pi/2018/06/06/15282732803587566708.png',
      number: 5555555555554444,
    },
    {
      name: 'JCB',
      img: 'https://img.ltwebstatic.com/images2_pi/2018/06/06/1528273241354964734.png',
      number: 3566002020360505,
    },
    {
      name: 'American Express',
      img: 'https://img.ltwebstatic.com/images2_pi/2018/06/06/1528273036537082707.png',
      number: 371449635398431,
    },
  ];
  constructor(
    public screen: ScreenServiceService,
    public auth: AuthServiceService,
    public firebaseAuth: FirebaseAuthServiceService
  ) {}
  ngOnInit() {
    this.screen.cartStep = 2;
    // this.firebaseAuth.shippingOption = this.shippingOptions[0];
    if (this.firebaseAuth.totalPrice > 500) {
      this.shippingOptions.unshift({
        name: 'Free Shipping',
        price: 0,
        des: 'Applied for order from €500',
      });
    }
    this.firebaseAuth.shippingSelected = this.shippingOptions[0];
    this.firebaseAuth.paymentSelected = this.paymentOptions[0];
    this.auth.getAddress();
    this.firebaseAuth.getCart().subscribe((data: CartItem[]) => {
      this.cartList = data;
    });

    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });
  }
}
