import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CartItem,
  FavoriteItem,
  SingleProduct,
} from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  @Input() id: string;
  @ViewChild('cartBtn') cartBtn: ElementRef;

  colors: string[];
  sizes: string[];
  colorValue: string;
  sizeValue: FormControl = new FormControl(null, Validators.required);
  quantityValue: number;
  isProductFavorite: boolean;
  favoriteId: string;
  submitTouched: boolean;
  finalPrice: number;
  mdScreen: boolean;
  miniImage: string;
  timeOut: any;
  favoriteList: FavoriteItem[];
  favoriteProducts: string[];

  constructor(
    private firebase: FirebaseServiceService,
    public screen: ScreenServiceService,
    private auth: AuthServiceService,
    private router: Router,
    private firebaseAuth: FirebaseAuthServiceService,
    private renderer: Renderer2
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    this.submitTouched = false;

    this.firebase
      .getSingleProduct(this.id)
      .subscribe((value: SingleProduct) => {
        if (value) {
          this.miniImage = value.images[0];
          this.colors = value.color;
          this.sizes = value.size;
          this.finalPrice = value.sale ? value.salePrice : value.price;
          this.colorValue = this.screen.isEditProductForm
            ? this.firebaseAuth.editColor
            : this.colors[0];

          this.sizeValue = this.screen.isEditProductForm
            ? new FormControl(this.firebaseAuth.editSize, Validators.required)
            : new FormControl(null, Validators.required);
          this.quantityValue = this.screen.isEditProductForm
            ? this.firebaseAuth.editQuantity
            : 1;
        }
      });
    // if (this.auth.user.value) {
    //   if (changes['id'].currentValue) {
    //     this.firebaseAuth.getFavorite().subscribe((data: FavoriteItem[]) => {
    //       this.isProductFavorite = data
    //         .map((item) => item.product_id)
    //         .includes(changes['id'].currentValue);

    //       const favoriteItem = data.find(
    //         (item) => item.product_id === changes['id'].currentValue
    //       );

    //       this.favoriteId = favoriteItem?.id;
    //     });
    //   }
    // }
  }
  ngOnInit() {
    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });
    if (this.auth.user.value?.token) {
      this.firebaseAuth.isFavoriteChange.subscribe((value) => {
        this.firebaseAuth
          .getFavorite()
          .subscribe((data: FavoriteItem[] | null) => {
            this.favoriteList = data;
            this.favoriteProducts = data?.map((item) => item.product_id);
          });
      });
    }
  }
  setColor(value: string) {
    this.colorValue = value;
  }

  add() {
    this.quantityValue = this.quantityValue + 1;
  }
  remove() {
    if (this.quantityValue > 1) {
      this.quantityValue = this.quantityValue - 1;
    }
  }
  addWish() {
    if (this.auth.user.value?.token) {
      // if (this.isProductFavorite) {
      //   this.firebaseAuth.deleteFavorite(this.favoriteId).subscribe({
      //     next: () => {
      //       this.firebaseAuth.isFavoriteChange.next(true);
      //       this.isProductFavorite = false;
      //     },
      //   });
      //   return;
      // }

      if (this.favoriteProducts.includes(this.id)) {
        const favorite_id: string = this.favoriteList.find(
          (item) => item.product_id === this.id
        )?.id;
        this.firebaseAuth.deleteFavorite(favorite_id).subscribe({
          next: () => {
            this.firebaseAuth.isFavoriteChange.next(true);
          },
        });
        return;
      }
      this.firebaseAuth
        .addFavorite({
          product_id: this.id,
        })
        .subscribe({
          next: () => {
            this.firebaseAuth.isFavoriteChange.next(true);
          },
        });
    } else {
      this.auth.logoutUser();
    }
  }

  addCart() {
    this.submitTouched = true;
    if (this.sizeValue.value) {
      if (this.auth.user.value?.token) {
        //check duplicate
        this.firebaseAuth.getCart().subscribe((data: CartItem[]) => {
          const duplicateCartItem = data.find(
            (cartItem) =>
              cartItem.product_id === this.id &&
              cartItem.color === this.colorValue &&
              cartItem.size === this.sizeValue.value[0]
          );

          if (duplicateCartItem) {
            this.firebaseAuth
              .editCartQuantity(duplicateCartItem.id, {
                quantity: duplicateCartItem.quantity + this.quantityValue,
              })
              .subscribe({
                next: () => {
                  this.firebaseAuth.isCartChange.next(true);
                  this.screen.isOpenProductForm = false;
                },
              });
            return;
          }
          //create image
          if (!this.screen.isOpenProductForm) {
            clearTimeout(this.timeOut);

            const miniImg = this.renderer.createElement('img');
            this.cartBtn.nativeElement.appendChild(miniImg);
            const cartPosition =
              this.cartBtn.nativeElement.getBoundingClientRect();
            miniImg.src = this.miniImage;
            miniImg.classList.add('mini-img');

            miniImg.style.top = `${cartPosition.top}px`;
            miniImg.style.left = `${cartPosition.left}px`;
            this.firebaseAuth
              .addCart({
                product_id: this.id,
                color: this.colorValue,
                size: this.sizeValue.value[0],
                quantity: this.quantityValue,
                finalPrice: this.finalPrice,
                img: this.miniImage,
              })
              .subscribe({
                next: () => {
                  miniImg.style.top = `1rem`;
                  miniImg.style.left = '95%';
                  miniImg.style.height = '0';
                  this.firebaseAuth.isCartChange.next(true);
                  // this.screen.isOpenProductForm = false;
                },
                error: () => {
                  miniImg.remove();
                },
              });
            this.timeOut = setTimeout(() => {
              miniImg.remove();
            }, 1000);
          } else {
            this.firebaseAuth
              .addCart({
                product_id: this.id,
                color: this.colorValue,
                size: this.sizeValue.value[0],
                quantity: this.quantityValue,
                finalPrice: this.finalPrice,
                img: this.miniImage,
              })
              .subscribe({
                next: () => {
                  this.firebaseAuth.isCartChange.next(true);
                  this.screen.isOpenProductForm = false;
                },
              });
          }
        });

        return;
      }
      this.auth.logoutUser();
    }
  }

  updateCart() {
    if (this.auth.user.value?.token) {
      this.firebaseAuth
        .editCart(this.firebaseAuth.activeEditCart, {
          color: this.colorValue,
          size: this.sizeValue.value[0],
          quantity: this.quantityValue,
        })
        .subscribe({
          next: () => {
            this.firebaseAuth.isCartChange.next(true);
            this.screen.isEditProductForm = false;
            if (this.mdScreen) {
              this.router.navigateByUrl('/cart');
            }
          },
        });

      // this.firebaseAuth.getCart().subscribe((data: CartItem[]) => {
      //   const duplicateCartItem = data.find(
      //     (cartItem) =>
      //       cartItem.product_id === this.id &&
      //       cartItem.color === this.colorValue &&
      //       cartItem.size === this.sizeValue.value[0]
      //   );

      //   if (duplicateCartItem) {
      //     this.firebaseAuth
      //       .editCartQuantity(duplicateCartItem.id, {
      //         quantity: duplicateCartItem.quantity + this.quantityValue,
      //       })
      //       .subscribe({
      //         next: () => {
      //           this.firebaseAuth
      //             .deleteCart(this.firebaseAuth.activeEditCart)
      //             .subscribe({
      //               next: () => {
      //                 this.firebaseAuth.isCartChange.next(true);
      //                 this.screen.isEditProductForm = false;
      //               },
      //             });
      //         },
      //       });
      //     return;
      //   }

      // });

      return;
    }
    this.auth.logoutUser();
  }
}
