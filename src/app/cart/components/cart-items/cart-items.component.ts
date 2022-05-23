import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart-item';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemsComponent {
  @Input() products: CartItem[] = [];
}
