import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NavigateServiceService } from 'src/app/service/navigate-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    public auth: AuthServiceService,
    private router: Router,
    private navigation: NavigateServiceService
  ) {}
  ngOnInit(): void {
    this.auth.authError = null;
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSubmit() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.auth
      .registerUser({ email, password, returnSecureToken: true })
      .subscribe({
        next: (value: any) => {
          const { email, expiresIn, idToken, localId } = value;
          const expirationDate = new Date().getTime() + expiresIn * 1000;

          this.auth.setUser(email, localId, idToken, expirationDate);
          localStorage.setItem(
            'user',
            JSON.stringify({ email, localId, idToken, expirationDate })
          );
          this.auth.addUser(localId, this.form.value).subscribe({
            next: (value) => {
              this.router.navigateByUrl('/');
            },
            error: (error) => console.log(error),
          });
        },
        error: (error) => (this.auth.authError = error.error.error.message),
      });
  }
}
