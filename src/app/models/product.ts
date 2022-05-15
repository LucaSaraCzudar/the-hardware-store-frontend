import { HardwareType } from './hardware-type';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface Product {
  name: string;
  price: number;
  hardwareType: HardwareType;
  description?: string;
  imageB64?: string;
  image?: SafeResourceUrl;
}
