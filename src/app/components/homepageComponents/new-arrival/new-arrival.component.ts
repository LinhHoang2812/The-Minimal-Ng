import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SingleProduct } from 'src/app/models/database.model';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
})
export class NewArrivalComponent implements OnInit {
  suggestProducts: SingleProduct[];
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    swipe: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          isFinite: false,
          swipeToSlide: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          isFinite: false,
          swipeToSlide: true,
        },
      },
    ],
  };
  newProducts: SingleProduct[];
  categories = ['women', 'men', 'kids'];
  activeCategory: string = 'women';
  activeImage: string;
  constructor(private firebase: FirebaseServiceService) {}

  ngOnInit(): void {
    this.firebase.getNewProducts().subscribe((value) => {
      this.newProducts = value;
    });
  }
  onClick(value: string) {
    if (value === 'men' || value === 'kids') {
      this.newProducts = Array(10).fill({
        name: 'lorem ipsum',
        images: [''],
        brand: 'lorem ipsum',
        price: 0,
      });
    } else {
      this.firebase.getNewProducts().subscribe((value: SingleProduct[]) => {
        this.newProducts = value;
      });
    }
    this.activeCategory = value;
  }
  onImageHover(id: string) {
    this.activeImage = id;
  }
}
