import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressInfo } from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  form: FormGroup;
  constructor(
    public screen: ScreenServiceService,
    private firebaseAuth: FirebaseAuthServiceService,
    public auth: AuthServiceService
  ) {}
  ngOnInit() {
    this.auth.addressInfo.subscribe((value: AddressInfo) => {
      this.form = new FormGroup({
        name: new FormControl(value ? value.name : null, Validators.required),
        lastName: new FormControl(
          value ? value.lastName : null,
          Validators.required
        ),
        phone: new FormControl(value ? value.phone : null, Validators.required),
        address: new FormControl(
          value ? value.address : null,
          Validators.required
        ),
        city: new FormControl(value ? value.city : null, Validators.required),
        country: new FormControl(
          value ? value.country : null,
          Validators.required
        ),
      });
    });
  }
  onSubmit() {
    if (this.auth.user.value?.token) {
      this.auth.editAddress({ addressInfo: this.form.value }).subscribe({
        next: () => {
          this.auth.getAddress();
          this.screen.isOpenAddressForm = false;
        },
      });
      return;
    }
    this.auth.logoutUser();
  }
}
