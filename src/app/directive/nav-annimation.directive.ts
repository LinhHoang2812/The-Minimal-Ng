import {
  Directive,
  ElementRef,
  AfterViewInit,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ScreenServiceService } from '../service/screen-service.service';

@Directive({
  selector: '[appNavAnnimation]',
})
export class NavAnnimationDirective implements AfterViewInit, OnInit {
  observer: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private route: Router,
    private screen: ScreenServiceService
  ) {}
  // @HostListener('mouseenter') onMouseEnter() {
  //   this.el.nativeElement.style.backgroundColor = 'white';
  //   this.el.nativeElement.classList.add('color');
  // }
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.el.nativeElement.style.backgroundColor = 'transparent';
  //   this.el.nativeElement.classList.remove('color');
  // }
  ngOnInit(): void {}
  @HostListener('mouseover') onMouseOver() {
    this.el.nativeElement.style.backgroundColor = 'white';
    this.el.nativeElement.classList.add('color');
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          this.el.nativeElement.classList.add('fix-nav');
          this.screen.isSearch = false;
        } else {
          this.el.nativeElement.classList.remove('fix-nav');
          this.screen.isSearch = false;
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }
  ngOnDestroy() {
    this.observer.disconnect();
  }
}
