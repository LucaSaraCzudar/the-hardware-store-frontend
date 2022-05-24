import { ProductType } from './product-type';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MinimalProduct } from './minimal-product';

export interface Product extends MinimalProduct {
  productType: ProductType;
  description: string;
  imageBase64: string;
  image?: SafeResourceUrl;
}
