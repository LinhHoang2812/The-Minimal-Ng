import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FavoriteItem, SingleProduct } from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: SingleProduct[];
  lgScreen: boolean;
  favoriteList: string[];
  favoriteData: FavoriteItem[];
  constructor(
    private auth: AuthServiceService,
    private route: ActivatedRoute,
    public firebase: FirebaseServiceService,
    public screen: ScreenServiceService,
    private firebaseAuth: FirebaseAuthServiceService
  ) {}
  ngOnInit(): void {
    this.screen.lgScreen().subscribe((value: any) => {
      this.lgScreen = value;
    });
    this.route.queryParams.subscribe((value: Params) => {
      const key = Object.keys(value)[0];
      if (key) {
        if (key === 'size' || key === 'color') {
          this.firebase
            .getProducts({ category: 'total' })
            .subscribe((data: SingleProduct[]) => {
              const filterData = data.filter((item: any) =>
                item[key].includes(value[key])
              );
              this.firebase.products = filterData;
            });
          return;
        }
        if (key === 'query') {
          this.firebase
            .getProducts({ category: 'total' })
            .subscribe((data: SingleProduct[]) => {
              const queryData = data.filter((item: any) =>
                item.name.includes(value[key])
              );
              this.firebase.products = queryData;
            });
          return;
        }

        this.firebase
          .getProducts(value)
          .subscribe(
            (data: SingleProduct[]) => (this.firebase.products = data)
          );
      }
    });

    if (this.auth.user.value?.token) {
      this.firebaseAuth.isFavoriteChange.subscribe((value) => {
        this.firebaseAuth
          .getFavorite()
          .subscribe((data: FavoriteItem[] | null) => {
            this.favoriteList = data?.map((item) => item.product_id);
            this.favoriteData = data;
          });
      });
    }
  }
  addWish(productId: string) {
    if (this.auth.user.value?.token) {
      if (this.favoriteList?.includes(productId)) {
        const favorite_id: string = this.favoriteData.find(
          (item) => item.product_id === productId
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
          product_id: productId,
        })
        .subscribe({
          next: () => {
            this.firebaseAuth.isFavoriteChange.next(true);
          },
        });
      return;
    }
    this.auth.logoutUser();
  }
}
