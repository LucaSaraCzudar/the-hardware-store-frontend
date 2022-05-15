import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { MaterialModule } from '../shared/material.module';
import { ProductsComponent } from './products/products.component';
import { BannerComponent } from './banner/banner.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductsComponent,
    BannerComponent,
    SearchComponent
  ],
  exports: [ProductItemComponent],
  imports: [CommonModule, MaterialModule, FormsModule]
})
export class ShopModule {}
