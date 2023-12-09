import { Component } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';
import { ScreenServiceService } from './service/screen-service.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';
import { NavigateServiceService } from './service/navigate-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'the-minimal-mind';

  constructor(
    private auth: AuthServiceService,
    public screen: ScreenServiceService,
    private router: Router,
    private navigation: NavigateServiceService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.expirationDate > new Date().getTime()) {
        const { email, localId, idToken, expirationDate } = user;
        this.auth.setUser(email, localId, idToken, expirationDate);
      }
    }
    this.router.events
      .pipe(
        filter((event: any) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        this.navigation.previousUrl = this.navigation.currentUrl;
        this.navigation.currentUrl = event.url;
      });
  }
}
