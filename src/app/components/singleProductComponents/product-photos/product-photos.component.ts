import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { BehaviorSubject } from 'rxjs';
import { SingleProduct } from 'src/app/models/database.model';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { LogoComponent } from '../../logo/logo.component';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.css'],
})
export class ProductPhotosComponent implements OnInit {
  @Input() id: string;
  @ViewChild('slick') slick: SlickCarouselComponent;
  images: string[];
  mainImg: string;
  mdScreen: boolean;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          isFinite: false,
          swipeToSlide: true,
        },
      },
    ],
  };
  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseServiceService,
    public screen: ScreenServiceService
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'].previousValue) {
      this.slick.slickGoTo(0);
    }
  }

  ngOnInit(): void {
    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });
    this.firebase.product.subscribe((data: SingleProduct) => {
      if (data) {
        this.images = data.images;
        this.mainImg = this.images[0];
      }
    });
  }
  ngAfterViewInit() {
    // console.log(this.slick);
  }

  setMainImg(value: string) {
    this.mainImg = value;
  }
  Change(e: {
    event: any;
    slick: any;
    currentSlide: number;
    first: boolean;
    last: boolean;
  }) {
    this.mainImg = this.images[e.currentSlide];
  }
}
