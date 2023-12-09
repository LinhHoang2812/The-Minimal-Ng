import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, UrlSegment } from '@angular/router';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  activeRoute: string;
  mdScreen: boolean;
  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private screen: ScreenServiceService
  ) {}

  ngOnInit() {
    this.screen.mdScreen().subscribe((value: any) => {
      this.mdScreen = value;
    });
  }
}
