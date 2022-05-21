import { HardwareType } from './hardware-type';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MinimalProduct } from './minimal-product';

export interface Product extends MinimalProduct {
  hardwareType: HardwareType;
  description: string;
  imageBase64: string;
  image?: SafeResourceUrl;
}
