import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { MaterialModule } from '../shared/material.module';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [ProductItemComponent, ProductsComponent],
  exports: [ProductItemComponent],
  imports: [CommonModule, MaterialModule]
})
export class ShopModule {}
