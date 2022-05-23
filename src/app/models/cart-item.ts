import { MinimalProduct } from './minimal-product';

export interface CartItem extends MinimalProduct {
  quantity?: number;
}
