import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../../shop/services/product-api.service';
import { Observable, startWith, switchMap } from 'rxjs';
import { CartItem } from '../../../models/cart-item';
import { CartApiService } from '../../../shared/services/cart-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;

  constructor(private readonly cartApiService: CartApiService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartApiService.cartUpdated$.pipe(
      startWith(undefined),
      switchMap(() => this.cartApiService.getCartItems())
    );
  }
}
