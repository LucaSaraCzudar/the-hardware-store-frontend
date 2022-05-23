import { Injectable } from '@angular/core';
import { finalize, Observable, Subject } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  cartUpdated$ = new Subject<void>();

  constructor(private readonly http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${environment.apiUrl}/cart-items`);
  }

  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http
      .post<CartItem>(`${environment.apiUrl}/cart-items`, cartItem)
      .pipe(finalize(() => this.cartUpdated$.next()));
  }

  updateQuantity(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(
      `${environment.apiUrl}/cart-items/${cartItem.id}`,
      cartItem.quantity
    );
  }

  removeCartItem(id: number): Observable<Response> {
    return this.http
      .delete<Response>(`${environment.apiUrl}/cart-items/${id}`)
      .pipe(finalize(() => this.cartUpdated$.next()));
  }
}
