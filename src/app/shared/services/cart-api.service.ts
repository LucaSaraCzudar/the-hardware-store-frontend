import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  constructor(private readonly http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${environment.apiUrl}/cart-items`);
  }

  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(
      `${environment.apiUrl}/cart-items`,
      cartItem
    );
  }

  updateQuantity(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(
      `${environment.apiUrl}/cart-items/${cartItem.id}`,
      cartItem.quantity
    );
  }

  removeCartItem(id: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.apiUrl}/cart-items/${id}`);
  }
}
