import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Pipe({
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {
  transform(products: CartItem[]): number {
    let price = 0;
    products?.forEach((p) => {
      price += p.price * (p.quantity || 1);
    });

    return price;
  }
}
