import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SingleProduct } from 'src/app/models/database.model';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.css'],
})
export class SingleProductPageComponent {
  id: string;
  constructor(
    public firebase: FirebaseServiceService,
    private route: ActivatedRoute,
    public screen: ScreenServiceService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((value: Params) => {
      this.id = value['id'];
      this.firebase
        .getSingleProduct(value['id'])
        .subscribe((data: SingleProduct) => {
          this.firebase.product.next(data);
        });
    });
  }
  setSizeMenu = (e: any) => {
    if (
      e.target.classList.contains('menu-listbox-label') ||
      e.target.classList.contains('expand-more')
    ) {
      this.screen.isSizeMenuOpen =
        this.screen.isSizeMenuOpen === true ? false : true;
    } else {
      this.screen.isSizeMenuOpen = false;
    }
  };
}
