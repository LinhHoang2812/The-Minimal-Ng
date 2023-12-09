import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartList: CartItem[];
  mdScreen: boolean;

  constructor(
    public firebaseAuth: FirebaseAuthServiceService,
    public screen: ScreenServiceService,
    private auth: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.screen.cartStep = 1;
    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });
    this.firebaseAuth.isCartChange.subscribe((value: boolean) => {
      this.firebaseAuth.getCart().subscribe((data: CartItem[]) => {
        this.cartList = data;

        this.firebaseAuth.totalPrice = data
          .map(({ finalPrice, quantity }) => {
            return finalPrice * quantity;
          })
          .reduce((a, b) => a + b, 0);
        this.firebaseAuth.totalQuantity = data
          .map(({ quantity }) => quantity)
          .reduce((a, b) => a + b, 0);
      });
    });
  }
  setSizeMenu = (e: any) => {
    if (e.target.classList.contains('menu-listbox-label')) {
      this.screen.isSizeMenuOpen =
        this.screen.isSizeMenuOpen === true ? false : true;
    } else {
      this.screen.isSizeMenuOpen = false;
    }
  };
  goToCheckOut() {
    this.router.navigateByUrl('/cart/checkout');
    // if (this.auth.user?.value.token) {
    //   if (this.firebaseAuth.cartStep === 1) {
    //     this.firebaseAuth.getCart().subscribe((data: CartItem[]) => {
    //       this.firebaseAuth
    //         .addOrder({
    //           items: data,
    //           paymentStatus: 'unpaid',
    //           orderStatus: 'uncompleted',
    //         })
    //         .subscribe({
    //           next: () => {
    //             this.router.navigateByUrl('/cart/checkout');
    //           },
    //         });
    //     });
    //   }

    //   return;
    // }
    // this.auth.logoutUser();
  }
}
