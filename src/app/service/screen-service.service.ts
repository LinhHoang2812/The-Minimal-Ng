import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenServiceService {
  view: string = 'grid';
  isSmallNavbarOpen: boolean = false;
  isSearch: boolean = false;
  isSizeMenuOpen: boolean = false;
  isOpenProductForm: boolean = false;
  isEditProductForm: boolean = false;
  isOpenAddressForm: boolean = false;
  cartStep: number;

  constructor(private observer: BreakpointObserver) {}

  smScreen(): Observable<BreakpointState> {
    return this.observer
      .observe(['(max-width: 640px)'])
      .pipe(map((value: any) => value.matches));
  }

  mdScreen(): Observable<BreakpointState> {
    return this.observer
      .observe(['(max-width: 768px)'])
      .pipe(map((value: any) => value.matches));
  }

  lgScreen(): Observable<BreakpointState> {
    return this.observer
      .observe(['(max-width: 1024px)'])
      .pipe(map((value: any) => value.matches));
  }

  xlScreen(): Observable<BreakpointState> {
    return this.observer
      .observe(['(max-width: 1280px)'])
      .pipe(map((value: any) => value.matches));
  }
}
