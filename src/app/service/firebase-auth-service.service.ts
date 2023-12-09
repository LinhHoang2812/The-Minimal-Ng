import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { CartItem, FavoriteItem, Order } from '../models/database.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthServiceService {
  isFavoriteChange = new BehaviorSubject<boolean>(false);
  isCartChange = new BehaviorSubject<boolean>(false);
  productFormId: string;
  editSize: string;
  editColor: string;
  editQuantity: number;
  activeEditCart: string;
  cartStep: number = 1;
  // shippingOption: { name: string; price: number; des: string };
  shippingSelected: { name: string; price: number; des: string };
  paymentSelected: { name: string; img: string; number: number };
  totalPrice: number;
  totalQuantity: number;

  constructor(private http: HttpClient, private auth: AuthServiceService) {}

  addFavorite(body: { product_id: string }) {
    return this.http.post(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/favorite/${this.auth.user.value.uid}.json?auth=${this.auth.user.value.token}`,
      body
    );
  }
  getFavorite() {
    return this.http
      .get<FavoriteItem[] | []>(
        `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/favorite/${this.auth.user.value.uid}.json?auth=${this.auth.user.value.token}`
      )
      .pipe(
        map((data: any) => {
          return data
            ? Object.keys(data).map((key: string) => {
                return { ...data[`${key}`], id: key };
              })
            : [];
        })
      );
  }
  deleteFavorite(favoriteId: string) {
    return this.http.delete(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/favorite/${this.auth.user.value.uid}/${favoriteId}.json?auth=${this.auth.user.value.token}`
    );
  }

  addCart(body: {
    product_id: string;
    size: string;
    color: string;
    quantity: number;
    finalPrice: number;
    img: string;
  }) {
    return this.http.post(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/cart/${this.auth.user.value.uid}.json?auth=${this.auth.user.value.token}`,
      body
    );
  }
  getCart() {
    return this.http
      .get<CartItem[] | []>(
        `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/cart/${this.auth.user.value.uid}.json?auth=${this.auth.user.value.token}`
      )
      .pipe(
        map((data: any) => {
          return data
            ? Object.keys(data).map((key: string) => {
                return { ...data[`${key}`], id: key };
              })
            : [];
        })
      );
  }
  deleteCart(CartId: string) {
    return this.http.delete(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/cart/${this.auth.user.value.uid}/${CartId}.json?auth=${this.auth.user.value.token}`
    );
  }
  editCartQuantity(CartId: string, body: { quantity: number }) {
    return this.http.patch(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/cart/${this.auth.user.value.uid}/${CartId}.json?auth=${this.auth.user.value.token}`,
      body
    );
  }
  editCart(
    CartId: string,
    body: { size: string; color: string; quantity: number }
  ) {
    return this.http.patch(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/cart/${this.auth.user.value.uid}/${CartId}.json?auth=${this.auth.user.value.token}`,
      body
    );
  }
  deleteUserCart() {
    return this.http.delete(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/cart/${this.auth.user.value.uid}.json?auth=${this.auth.user.value.token}`
    );
  }
  addOrder(body: {
    items: CartItem[];
    amount: number;
    paid: boolean;
    createdAt: Date;
  }) {
    return this.http.post(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/order/${this.auth.user.value.uid}.json?auth=${this.auth.user.value.token}`,
      body
    );
  }
  getAllOrders() {
    return this.http
      .get<Order[] | []>(
        `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/order/${this.auth.user.value.uid}.json?auth=${this.auth.user.value.token}`
      )
      .pipe(
        map((data: any) => {
          return data
            ? Object.keys(data).map((key: string) => {
                return { ...data[`${key}`], id: key };
              })
            : [];
        })
      );
  }
  deleteOrder(orderId: string) {
    return this.http.delete(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/order/${this.auth.user.value.uid}/${orderId}.json?auth=${this.auth.user.value.token}`
    );
  }
}
