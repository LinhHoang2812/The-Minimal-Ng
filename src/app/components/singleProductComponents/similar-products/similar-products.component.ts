import { Component, Input, SimpleChanges } from '@angular/core';
import { SingleProduct } from 'src/app/models/database.model';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css'],
})
export class SimilarProductsComponent {
  @Input() id: string;
  similarProducts: SingleProduct[];
  constructor(private firebase: FirebaseServiceService) {}
  ngOnChanges(changes: SimpleChanges) {
    this.firebase
      .getProducts({ category: 'total' })
      .subscribe((data: SingleProduct[]) => {
        const filterData = data.filter((product) => {
          return (
            product.category ===
              data.find((value) => value.id === changes['id'].currentValue)
                .category && product.id !== changes['id'].currentValue
          );
        });
        this.similarProducts = filterData;
      });
  }
}
