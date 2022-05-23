import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart-item';
import { CartService } from '../../../shared/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemsComponent {
  @Input() items: CartItem[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar
  ) {}

  onRemove(cartItem: CartItem): void {
    this.cartService.removeCartItem(cartItem).subscribe(
      () => {
        this.snackBar.open(`${cartItem.name} removed from the cart`, 'X');
      },
      () => {
        this.snackBar.open(
          `An error happened while removing the item from the cart`,
          'X'
        );
      }
    );
  }
}
