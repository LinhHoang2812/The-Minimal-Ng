import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  name: string;
  email: string;
  mdScreen: boolean;
  constructor(
    public auth: AuthServiceService,
    public screen: ScreenServiceService
  ) {}
  ngOnInit() {
    this.screen.mdScreen().subscribe((data: any) => {
      this.mdScreen = data;
    });
    this.auth.getAddress();
    if (this.auth.user.value?.token) {
      this.auth.getUser().subscribe((data: any) => {
        this.name = data.name;
        this.email = data.email;
      });
    }
  }
}
