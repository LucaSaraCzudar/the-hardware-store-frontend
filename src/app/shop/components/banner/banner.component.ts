import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [animate('500ms', style({ opacity: 0 }))])
    ])
  ]
})
export class BannerComponent implements OnDestroy {
  currentSlide = 0;
  interval: number;

  slides = [
    { src: 'assets/img/1.jpg' },
    { src: 'assets/img/2.jpg' },
    { src: 'assets/img/3.jpg' },
    { src: 'assets/img/4.jpg' }
  ];
  constructor(private readonly cdr: ChangeDetectorRef) {
    this.interval = setInterval(() => {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
      this.cdr.markForCheck();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
