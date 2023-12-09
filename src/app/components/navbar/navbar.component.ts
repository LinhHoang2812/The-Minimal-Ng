import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartItem, FavoriteItem } from 'src/app/models/database.model';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FirebaseAuthServiceService } from 'src/app/service/firebase-auth-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  favoriteCount: number;
  cartCount: number;
  menu = new BehaviorSubject<string[]>(null);
  items = [
    { title: 'women', options: ['outer', 'top', 'dress', 'skirt', 'pants'] },
    { title: 'men', options: ['Outer', 'Top', 'Pants'] },
    { title: 'kid', options: ['Outer', 'Top', 'Pants'] },
  ];

  panelOpenState = false;
  mdScreen: boolean;
  lgScreen: boolean;
  expandedIndex = 0;
  expandedContent: any;
  navItems = ['fashion', 'blog', 'collection', 'event', 'look book'];

  path = new BehaviorSubject<boolean>(window.location.pathname === '/');
  q: string;
  form: FormGroup;
  constructor(
    public auth: AuthServiceService,
    public screen: ScreenServiceService,
    private location: Location,
    private el: ElementRef,
    private router: Router,
    private firebaseAuth: FirebaseAuthServiceService
  ) {}

  @HostListener('mouseleave') onMouseLeave(options: string[]) {
    this.menu.next(null);

    this.path.subscribe((value: boolean) => {
      if (value) {
        this.el.nativeElement.firstElementChild.style.backgroundColor =
          'transparent';
        this.el.nativeElement.firstElementChild.classList.remove('color');
      }
    });
  }

  ngOnInit(): void {
    this.screen.lgScreen().subscribe((data: any) => {
      this.lgScreen = data;
    });
    this.expandedContent = this.items[this.expandedIndex].options;
    this.location.onUrlChange((url: string) => {
      this.path.next(url === '/');
    });

    this.form = new FormGroup({ query: new FormControl() });

    this.auth.user.subscribe((user: User) => {
      if (user && user.token) {
        this.firebaseAuth.isFavoriteChange.subscribe((value: boolean) => {
          this.firebaseAuth.getFavorite().subscribe((data: FavoriteItem[]) => {
            this.favoriteCount = data?.length;
          });
        });
        this.firebaseAuth.isCartChange.subscribe((value) => {
          this.firebaseAuth.getCart().subscribe((data: CartItem[]) => {
            this.cartCount = data?.length;
          });
        });

        return;
      }
      this.favoriteCount = null;
      this.cartCount = null;
    });
  }
  onHover(options: string[]) {
    this.menu.next(options);
  }

  setSmallNavbar() {
    this.screen.isSmallNavbarOpen = !this.screen.isSmallNavbarOpen;
  }

  setSearch(e: any) {
    if (
      e.target.innerHTML === ' search ' ||
      e.target.classList.contains('search-input') ||
      e.target.classList.contains('search-form') ||
      e.target.classList.contains('submit-btn')
    ) {
      this.screen.isSearch = true;
      return;
    }
    this.screen.isSearch = false;
  }
  onSubmit() {
    let navigationExtras: NavigationExtras = {
      queryParams: { query: this.form.value.query },
    };
    this.router.navigate(['/products'], navigationExtras);
  }
}
// e.target.classList.contains('material-symbols-outlined') ||
