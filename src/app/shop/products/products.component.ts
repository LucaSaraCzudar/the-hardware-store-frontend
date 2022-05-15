import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { products } from '../../mock/products.mock';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = products;
  constructor() {}

  ngOnInit(): void {}
}
