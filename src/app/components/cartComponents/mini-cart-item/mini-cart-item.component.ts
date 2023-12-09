import { Component, Input } from '@angular/core';
import { SingleProduct } from 'src/app/models/database.model';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';

@Component({
  selector: 'app-mini-cart-item',
  templateUrl: './mini-cart-item.component.html',
  styleUrls: ['./mini-cart-item.component.css'],
})
export class MiniCartItemComponent {
  @Input() id: string;
  @Input() finalPrice: number;
  @Input() quantity: number;
  salePercent: number;
  image: string;
  constructor(private firebase: FirebaseServiceService) {}
  ngOnInit() {
    this.firebase.getSingleProduct(this.id).subscribe((data: SingleProduct) => {
      this.image = data.images[0];
      if (data.sale) {
        this.salePercent = (data.price - data.salePrice) / data.price;
      }
    });
  }
}
