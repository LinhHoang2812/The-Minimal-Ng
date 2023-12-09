import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent {
  @Input() id: string;

  constructor(
    public firebase: FirebaseServiceService,
    private route: ActivatedRoute,
    public screen: ScreenServiceService
  ) {}
  ngOnInit(): void {}
}
