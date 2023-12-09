import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { BehaviorSubject } from 'rxjs';
import { SingleProduct } from 'src/app/models/database.model';
@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css'],
})
export class SuggestComponent implements OnInit {
  suggestProducts: SingleProduct[];
  activeImage: string;
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
          dots: false,
        },
      },
    ],
  };
  constructor(private firebase: FirebaseServiceService) {}
  ngOnInit(): void {
    this.firebase
      .getSuggestProducts()
      .subscribe((value: SingleProduct[]) => (this.suggestProducts = value));
  }
  onImageHover(id: string) {
    this.activeImage = id;
  }
}
