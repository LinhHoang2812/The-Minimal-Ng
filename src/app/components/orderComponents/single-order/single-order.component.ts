import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css'],
})
export class SingleOrderComponent {
  @Input() order: Order;
  @Output() delete = new EventEmitter();
  mdScreen: boolean;
  constructor(
    private auth: AuthServiceService,
    private firebaseAuth: FirebaseAuthServiceService,
    private screen: ScreenServiceService
  ) {}
  ngOnInit() {
    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });
  }
  deleteOrder() {
    if (this.auth.user.value?.token) {
      this.firebaseAuth.deleteOrder(this.order.id).subscribe(() => {
        this.delete.emit(null);
      });

      return;
    }
    this.auth.logoutUser();
  }
}
