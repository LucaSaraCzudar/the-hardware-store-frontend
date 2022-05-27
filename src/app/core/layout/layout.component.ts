import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CartService } from '../../shared/services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav | null = null;

  mobileQuery: MediaQueryList;
  opened$: BehaviorSubject<boolean> = this.cartService.cartOpened$;
  private readonly _mobileQueryListener: () => void;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly cartService: CartService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  onToggle(): void {
    this.sidenav?.toggle();
    this.opened$.next(!this.opened$.getValue());
  }
}
