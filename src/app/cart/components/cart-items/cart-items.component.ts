import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemsComponent {
  @Input() products: Product[] = [];
}
