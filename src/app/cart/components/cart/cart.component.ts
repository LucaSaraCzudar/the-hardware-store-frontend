import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../../models/cart-item';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;

  constructor(private readonly cartService: CartService) {}
}
