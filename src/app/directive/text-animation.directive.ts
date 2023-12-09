import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appTextAnimation]',
})
export class TextAnimationDirective implements OnDestroy, AfterViewInit {
  observer: IntersectionObserver;

  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('move-text');
        } else {
          this.el.nativeElement.classList.remove('move-text');
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
