import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../../shared/services/product.service';
import { MinimalProduct } from '../../models/minimal-product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null = null;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    if (this.product?.imageBase64) {
      this.product.image = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.product.imageBase64
      );
    }
  }

  addToCart(product: Product): void {
    const minimalProduct: MinimalProduct = {
      id: product.id,
      name: product.name,
      price: product.price
    };
    this.productService.addCartItem(minimalProduct).subscribe();
  }
}
