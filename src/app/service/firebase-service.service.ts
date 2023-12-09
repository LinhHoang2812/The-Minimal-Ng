import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SingleProduct } from '../models/database.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  products: SingleProduct[];
  product = new BehaviorSubject<SingleProduct>(null);
  constructor(private http: HttpClient, private auth: AuthServiceService) {}

  getNewProducts() {
    return this.http
      .get<SingleProduct[]>(
        'https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="rating"&equalTo=0&limitToFirst=10'
      )
      .pipe(
        map((data: any) =>
          Object.keys(data).map((key: string) => {
            return { ...data[`${key}`], id: key };
          })
        )
      );
  }
  getSuggestProducts() {
    return this.http
      .get<SingleProduct[]>(
        'https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="viewCount"&startAt=5'
      )
      .pipe(
        map((data: any) =>
          Object.keys(data).map((key: string) => {
            return { ...data[`${key}`], id: key };
          })
        )
      );
  }
  getProducts(param: any) {
    const key = Object.keys(param)[0];

    if (param[key] === 'total') {
      return this.http
        .get<SingleProduct[]>(
          `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="${key}"`
        )
        .pipe(
          map((data: any) =>
            Object.keys(data).map((key: string) => {
              return { ...data[`${key}`], id: key };
            })
          )
        );
    }
    if (key === 'viewCount' || key === 'sale' || key === 'rating') {
      return this.http
        .get<SingleProduct[]>(
          `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="${key}"&equalTo=${param[
            key
          ].toLowerCase()}`
        )
        .pipe(
          map((data: any) =>
            Object.keys(data).map((key: string) => {
              return { ...data[`${key}`], id: key };
            })
          )
        );
    }
    if (key === 'price' && (param[key] == 'asc' || param[key] == 'desc')) {
      return this.http
        .get<SingleProduct[]>(
          `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="${key}"`
        )
        .pipe(
          map((data: any) =>
            Object.keys(data).map((key: string) => {
              return { ...data[`${key}`], id: key };
            })
          ),
          map((arr: any) =>
            arr.sort((a: any, b: any) => {
              const priceA = a.price;
              const priceB = b.price;
              if (param[key] == 'asc') {
                return priceA - priceB;
              } else {
                return priceB - priceA;
              }
            })
          )
        );
    }
    if (key === 'minPrice') {
      const keys = Object.keys(param);
      return this.http
        .get<SingleProduct[]>(
          `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="price"&startAt=${
            param[keys[0]]
          }&endAt=${param[keys[1]]}`
        )
        .pipe(
          map((data: any) =>
            Object.keys(data).map((key: string) => {
              return { ...data[`${key}`], id: key };
            })
          )
        );
    }

    return this.http
      .get<SingleProduct[]>(
        `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="${key}"&equalTo="${param[key]}"`
      )
      .pipe(
        map((data: any) =>
          Object.keys(data).map((key: string) => {
            return { ...data[`${key}`], id: key };
          })
        )
      );
  }
  getBrands() {
    return this.http
      .get<string[]>(
        `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?`
      )
      .pipe(
        map((data: any) =>
          Object.keys(data).map((key: string) => {
            return { ...data[`${key}`], id: key };
          })
        ),
        map((data) => data.map((value) => value.brand)),
        map((data) => [...new Set(data)])
      );
  }
  getColors() {
    return this.http
      .get<string[]>(
        `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?`
      )
      .pipe(
        map((data: any) =>
          Object.keys(data).map((key: string) => {
            return { ...data[`${key}`], id: key };
          })
        ),
        map((data) => data.map((value) => value.color).flat()),
        map((data) => [...new Set(data)])
      );
  }
  getSizes() {
    return this.http
      .get<string[]>(
        `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?`
      )
      .pipe(
        map((data: any) =>
          Object.keys(data).map((key: string) => {
            return { ...data[`${key}`], id: key };
          })
        ),
        map((data) => data.map((value) => value.size).flat()),
        map((data) => [...new Set(data)])
      );
  }
  getCategories() {
    return this.http
      .get<string[]>(
        `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products.json?`
      )
      .pipe(
        map((data: any) =>
          Object.keys(data).map((key: string) => {
            return { ...data[`${key}`], id: key };
          })
        ),
        map((data) => data.map((value) => value.category)),
        map((data) => ['total', ...new Set(data)])
      );
  }
  getSingleProduct = (id: string) => {
    return this.http.get<SingleProduct>(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`
    );
  };
}
