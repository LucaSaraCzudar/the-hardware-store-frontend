import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _products = new BehaviorSubject<Product[]>([]);
  readonly products$ = this._products.asObservable();

  constructor(private readonly productApiService: ProductApiService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productApiService.getAllProducts()
      .subscribe((products: Product[]) => {
        this._products.next(products);
      })
  }

  searchProducts(name: string): void {
    if (!name) {
      this.loadProducts();
    } else {
      this.productApiService.searchProductsByName(name)
        .subscribe((products: Product[]) => {
          this._products.next(products);
        });
    }
  }
}
