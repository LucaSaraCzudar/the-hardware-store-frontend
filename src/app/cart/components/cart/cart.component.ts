import { ChangeDetectionStrategy, Component } from '@angular/core';
import { products } from 'src/app/mock/products.mock';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  products: Product[] = products;
}
