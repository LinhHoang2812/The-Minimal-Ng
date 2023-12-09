import { Component, Input } from '@angular/core';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';

@Component({
  selector: 'app-cart-select',
  templateUrl: './cart-select.component.html',
  styleUrls: ['./cart-select.component.css'],
})
export class CartSelectComponent {
  @Input() name: string;
  @Input() price: number;
  @Input() des: string;
  @Input() img: string;
  constructor(public firebaseAuth: FirebaseAuthServiceService) {}
  ngOnInit() {}
}
