import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-cart-section',
  templateUrl: './cart-section.component.html',
  styleUrls: ['./cart-section.component.css'],
})
export class CartSectionComponent {
  mdScreen: boolean;
  constructor(
    public location: Location,
    public firebaseAuth: FirebaseAuthServiceService,
    private screen: ScreenServiceService
  ) {}
  ngOnInit() {
    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });
  }
}
