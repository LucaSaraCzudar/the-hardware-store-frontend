import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Observable, startWith, switchMap } from 'rxjs';
import { CartItem } from '../../../models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.cartItems$ = this.productService.cartUpdated$.pipe(
      startWith(undefined),
      switchMap(() => this.productService.getCartItems())
    );
  }
}
