import { Component, Input } from '@angular/core';
import { SingleProduct } from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css'],
})
export class WishlistItemComponent {
  @Input() id: string;
  @Input() favorite_id: string;
  name: string;
  price: number;
  images: string[];
  image: string;
  sale: boolean;
  salePrice: number;
  constructor(
    private firebase: FirebaseServiceService,
    private auth: AuthServiceService,
    private firebaseAuth: FirebaseAuthServiceService,
    private screen: ScreenServiceService
  ) {}

  ngOnInit() {
    this.screen.isOpenProductForm = false;
    this.firebase.getSingleProduct(this.id).subscribe((data: SingleProduct) => {
      this.name = data.name;
      this.price = data.price;
      this.images = data.images;
      this.image = this.images[0];
      this.sale = data.sale;
      this.salePrice = data.salePrice;
    });
  }
  onHover() {
    this.image = this.images?.[1];
  }
  onMouseLeave() {
    this.image = this.images[0];
  }
  delete() {
    if (this.auth.user.value?.token) {
      this.firebaseAuth.deleteFavorite(this.favorite_id).subscribe({
        next: () => {
          this.firebaseAuth.isFavoriteChange.next(true);
        },
      });
      return;
    }
    this.auth.logoutUser();
  }
  openProductForm() {
    this.firebase.getSingleProduct(this.id).subscribe((data: SingleProduct) => {
      this.firebase.product.next(data);
    });
    this.screen.isOpenProductForm = true;
    this.firebaseAuth.productFormId = this.id;
  }
}
