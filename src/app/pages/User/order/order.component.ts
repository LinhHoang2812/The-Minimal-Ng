import { Component } from '@angular/core';
import { Order } from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orders: Order[];
  constructor(
    private firebaseAuth: FirebaseAuthServiceService,
    private auth: AuthServiceService
  ) {}
  ngOnInit() {
    this.getData();
  }
  getData() {
    if (this.auth.user.value?.token) {
      this.firebaseAuth.getAllOrders().subscribe((data: Order[]) => {
        this.orders = data;
      });
      return;
    }
    this.auth.logoutUser();
  }
  onDelete() {
    this.getData();
  }
}
