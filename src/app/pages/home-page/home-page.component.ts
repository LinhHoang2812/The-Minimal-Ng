import { Component, OnInit } from '@angular/core';

import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  mdScreen: boolean;
  constructor(
    private firebase: FirebaseServiceService,
    public screen: ScreenServiceService
  ) {}

  ngOnInit(): void {
    this.screen.mdScreen().subscribe((data: any) => (this.mdScreen = data));
  }
}
