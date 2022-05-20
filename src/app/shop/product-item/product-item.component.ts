import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null = null;

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.product?.imageBase64) {
      this.product.image = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.product.imageBase64
      );
    }
  }
}
