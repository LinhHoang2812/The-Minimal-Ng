import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NavigateServiceService } from 'src/app/service/navigate-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  form: FormGroup;
  constructor(
    public auth: AuthServiceService,
    private router: Router,
    private navigation: NavigateServiceService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    this.auth
      .signinUser({ ...this.form.value, returnSecureToken: true })
      .subscribe({
        next: (value: any) => {
          const { email, expiresIn, idToken, localId } = value;
          const expirationDate = new Date().getTime() + expiresIn * 1000;

          this.auth.setUser(email, localId, idToken, expirationDate);

          localStorage.setItem(
            'user',
            JSON.stringify({ email, localId, idToken, expirationDate })
          );
          console.log(this.navigation.previousUrl);

          if (
            this.navigation.previousUrl &&
            this.navigation.previousUrl !== '/login'
          ) {
            this.router.navigateByUrl(this.navigation.previousUrl);
            return;
          }
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.auth.authError = error.error.error.message;
        },
      });
  }
}
