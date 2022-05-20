import { HardwareType } from './hardware-type';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface Product {
  id: number;
  name: string;
  price: number;
  hardwareType: HardwareType;
  description: string;
  imageBase64: string;
  image?: SafeResourceUrl;
}
