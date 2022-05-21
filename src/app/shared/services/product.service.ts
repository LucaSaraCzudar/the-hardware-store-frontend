import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { finalize, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MinimalProduct } from '../../models/minimal-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartUpdated$ = new Subject<void>();

  constructor(private readonly http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  getCartItems(): Observable<MinimalProduct[]> {
    return this.http.get<MinimalProduct[]>(`${environment.apiUrl}/cart-items`);
  }

  addCartItem(cartItem: MinimalProduct): Observable<Response> {
    return this.http
      .post<Response>(`${environment.apiUrl}/cart-items`, cartItem)
      .pipe(finalize(() => this.cartUpdated$.next()));
  }

  removeCartItem(id: number): Observable<Response> {
    return this.http
      .delete<Response>(`${environment.apiUrl}/cart-items/${id}`)
      .pipe(finalize(() => this.cartUpdated$.next()));
  }
}
