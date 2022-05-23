import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { CartApiService } from './cart-api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private readonly cartApiService: CartApiService) {}

  addCartItem(cartItem: CartItem): void {}
}
