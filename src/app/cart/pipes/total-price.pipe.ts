import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/product';

@Pipe({
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {
  transform(products: Product[]): number {
    let price = 0;
    products?.forEach((p) => (price += p.price));

    return price;
  }
}
