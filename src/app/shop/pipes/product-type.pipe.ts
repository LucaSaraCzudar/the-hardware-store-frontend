import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../../models/product-type';

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) {
      return null;
    }

    return ProductType[value as keyof typeof ProductType];
  }
}
