import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../shared/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  products$: Observable<Product[]> = this.productService.getAllProducts();

  constructor(private readonly productService: ProductService) {}
}
