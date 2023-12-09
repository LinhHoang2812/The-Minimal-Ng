import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleProduct } from 'src/app/models/database.model';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  @Input() id: string;

  name: string;
  brand: string;
  price: number;
  sale: boolean;
  salePrice: number;
  stars: any[];
  nonStars: any[];
  isRatingInterger: boolean;
  reviewCount: number;

  constructor(
    public firebase: FirebaseServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.firebase.product.subscribe((value: SingleProduct) => {
      if (value) {
        this.name = value.name;
        this.brand = value.brand;
        this.price = value.price;
        this.sale = value.sale;
        this.salePrice = value.salePrice;
        this.isRatingInterger = Number.isInteger(value.rating);
        this.stars = Array.from({
          length: Math.floor(value.rating),
        });
        this.nonStars = Array.from({ length: Math.floor(5 - value.rating) });
        this.reviewCount = value.viewCount;
      }
    });
  }
}
