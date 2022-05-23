import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { CartItem } from '../../../models/cart-item';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null = null;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.product?.imageBase64) {
      this.product.image = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.product.imageBase64
      );
    }
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price
    };
    this.cartService.addCartItem(cartItem).subscribe();
  }
}
