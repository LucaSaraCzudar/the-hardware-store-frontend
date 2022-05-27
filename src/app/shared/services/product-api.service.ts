import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../../models/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartItem } from '../../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  constructor(private readonly http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  filterProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}/products/filters?name=${name}`
    );
  }
}
