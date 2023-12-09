import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteItem, SingleProduct } from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() id: string;
  @Input() cart_id: string;
  @Input() size: string;
  @Input() color: string;
  @Input() quantity: number;
  name: string;
  price: number;
  image: string;
  sale: boolean;
  salePrice: number;
  mdScreen: boolean;
  constructor(
    private firebase: FirebaseServiceService,
    private auth: AuthServiceService,
    private firebaseAuth: FirebaseAuthServiceService,
    private screen: ScreenServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.screen.isOpenProductForm = false;
    this.firebase.getSingleProduct(this.id).subscribe((data: SingleProduct) => {
      this.name = data.name;
      this.price = data.price;
      this.image = data.images[0];
      this.sale = data.sale;
      this.salePrice = data.salePrice;
    });
    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });
  }
  editQuantity() {
    if (this.auth.user.value?.token) {
      this.firebaseAuth
        .editCartQuantity(this.cart_id, { quantity: this.quantity })
        .subscribe({
          next: () => {
            this.firebaseAuth.isCartChange.next(true);
          },
        });
      return;
    }
    this.auth.logoutUser();
  }

  add() {
    this.quantity = this.quantity + 1;
    this.editQuantity();
  }
  remove() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
      this.editQuantity();
    }
  }
  movetoFavorite() {
    if (this.auth.user.value?.token) {
      this.firebaseAuth.deleteCart(this.cart_id).subscribe({
        next: () => {
          this.firebaseAuth.isCartChange.next(true);
          this.firebaseAuth.getFavorite().subscribe((data: FavoriteItem[]) => {
            if (!data.map((item) => item.product_id).includes(this.id)) {
              this.firebaseAuth
                .addFavorite({ product_id: this.id })
                .subscribe();
            }
          });
        },
      });
      return;
    }
    this.auth.logoutUser();
  }
  removeCart() {
    if (this.auth.user.value?.token) {
      this.firebaseAuth.deleteCart(this.cart_id).subscribe({
        next: () => {
          this.firebaseAuth.isCartChange.next(true);
        },
      });
      return;
    }
    this.auth.logoutUser();
  }
  openEditForm() {
    this.firebase.getSingleProduct(this.id).subscribe((data: SingleProduct) => {
      this.firebase.product.next(data);
    });
    this.screen.isEditProductForm = true;
    this.firebaseAuth.productFormId = this.id;
    this.firebaseAuth.editSize = this.size;
    this.firebaseAuth.editColor = this.color;
    this.firebaseAuth.editQuantity = this.quantity;
    this.firebaseAuth.activeEditCart = this.cart_id;
    if (this.mdScreen) {
      this.router.navigateByUrl(`/products/${this.id}`);
    }
  }
}
