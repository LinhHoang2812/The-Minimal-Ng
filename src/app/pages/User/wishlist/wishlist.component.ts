import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteItem } from 'src/app/models/database.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  favoriteItems: FavoriteItem[] | null;
  constructor(
    public firebaseAuth: FirebaseAuthServiceService,
    public screen: ScreenServiceService,
    private auth: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.firebaseAuth.isFavoriteChange.subscribe((value) => {
      if (this.auth.user.value?.token) {
        this.firebaseAuth.getFavorite().subscribe((data: FavoriteItem[]) => {
          this.favoriteItems = data;
        });
        return;
      }
      this.router.navigateByUrl('/');
    });
  }
  setSizeMenu = (e: any) => {
    if (e.target.classList.contains('menu-listbox-label')) {
      this.screen.isSizeMenuOpen =
        this.screen.isSizeMenuOpen === true ? false : true;
    } else {
      this.screen.isSizeMenuOpen = false;
    }
  };
}
