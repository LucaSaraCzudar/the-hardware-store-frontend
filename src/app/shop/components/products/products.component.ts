import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../../../models/product';
import { Observable } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  products$: Observable<Product[]> = this.productService.products$;

  constructor(private readonly productService: ProductService) {}
}
