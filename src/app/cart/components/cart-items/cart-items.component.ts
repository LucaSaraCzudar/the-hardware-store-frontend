import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart-item';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemsComponent {
  @Input() items: CartItem[] = [];

  constructor(private readonly cartService: CartService) {}

  onRemove(cartItem: CartItem): void {
    this.cartService.removeCartItem(cartItem).subscribe();
  }
}
