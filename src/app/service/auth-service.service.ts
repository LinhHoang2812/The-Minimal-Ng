import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AddressInfo } from '../models/database.model';

HttpErrorResponse;
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  user = new BehaviorSubject<User>(null);
  addressInfo = new BehaviorSubject<AddressInfo>(null);
  authError: string;

  signupUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUh8QsixW-fI31g9iRh4ZlGwE0KyblrpE';
  signinUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUh8QsixW-fI31g9iRh4ZlGwE0KyblrpE';
  constructor(private http: HttpClient, private router: Router) {}

  setUser(email: string, uid: string, token: string, expirationDate: number) {
    const user = new User(email, uid, token, expirationDate);
    this.user.next(user);
  }

  signinUser(body: {}) {
    return this.http.post(this.signinUrl, body);
  }
  registerUser(body: {}) {
    return this.http.post(this.signupUrl, body);
  }
  addUser(uid: string, body: {}) {
    return this.http.put(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json?auth=${this.user.value.token}`,
      body
    );
  }
  getUser() {
    return this.http.get(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/users/${this.user.value.uid}.json?auth=${this.user.value.token}`
    );
  }
  editAddress(body: { addressInfo: AddressInfo }) {
    return this.http.patch(
      `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/users/${this.user.value.uid}.json?auth=${this.user.value.token}`,
      body
    );
  }
  getAddress() {
    if (this.user.value.token) {
      this.http
        .get<AddressInfo | null>(
          `https://the-minimal-default-rtdb.europe-west1.firebasedatabase.app/users/${this.user.value.uid}.json?auth=${this.user.value.token}`
        )
        .pipe(map((data: any) => data.addressInfo))
        .subscribe((data: AddressInfo) => this.addressInfo.next(data));
      return;
    }
    this.logoutUser();
  }

  logoutUser() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
