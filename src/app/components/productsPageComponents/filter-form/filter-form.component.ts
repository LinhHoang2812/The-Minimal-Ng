import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { ScreenServiceService } from 'src/app/service/screen-service.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent implements OnInit {
  smallActiveFilter: string = 'sort';
  activeFilter: string;
  complexActiveFilter: string = null;
  isComplexFilterOpen: boolean = false;

  lgScreen: boolean;
  mdScreen: boolean;

  categories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  minPrice: number = 0;
  maxPrice: number = 1000;

  filterTitles: { title: string; content: string[] }[] = [
    {
      title: 'category',
      content: [],
    },
    {
      title: 'brand',
      content: [],
    },
    {
      title: 'color',
      content: [],
    },
    {
      title: 'size',
      content: [],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public firebase: FirebaseServiceService,
    public screen: ScreenServiceService
  ) {}
  ngOnInit(): void {
    this.screen.lgScreen().subscribe((value: any) => {
      this.lgScreen = value;
    });

    this.screen.mdScreen().subscribe((value: any) => (this.mdScreen = value));
    this.route.queryParams.subscribe((value: Params) => {
      const key = Object.keys(value)[0];
      const param = value[key];
      this.activeFilter = param;

      this.isComplexFilterOpen = false;
      this.complexActiveFilter = null;
      if (param === 'asc') {
        this.smallActiveFilter = 'low price';
        return;
      }
      if (param === 'desc') {
        this.smallActiveFilter = 'high price';
        return;
      }
      if (key === 'rating') {
        this.smallActiveFilter = 'new';
        return;
      }
      if (key === 'sale') {
        this.smallActiveFilter = 'sale';
      }
    });

    this.firebase.getCategories().subscribe((value: string[]) => {
      this.categories = value;
      this.filterTitles[0].content = value;
    });

    this.firebase.getBrands().subscribe((value: string[]) => {
      this.brands = value;
      this.filterTitles[1].content = value;
    });
    this.firebase.getColors().subscribe((value: string[]) => {
      this.colors = value;
      this.filterTitles[2].content = value;
    });
    this.firebase.getSizes().subscribe((value: string[]) => {
      this.sizes = value;
      this.filterTitles[3].content = value;
    });
  }
  setComplexFilter() {
    this.isComplexFilterOpen = !this.isComplexFilterOpen;
    this.complexActiveFilter = null;
  }

  setComplexActiveFilter(value: string) {
    if (value === this.complexActiveFilter) {
      this.complexActiveFilter = null;
      return;
    }
    this.complexActiveFilter = value;
  }

  changeView(value: string) {
    this.screen.view = value;
  }
  setSmallFilter(value: { title: string; content: string }) {
    let navigationExtras: NavigationExtras = {
      queryParams: { [value.title]: value.content },
    };
    this.router.navigate(['/products'], navigationExtras);
  }
}
