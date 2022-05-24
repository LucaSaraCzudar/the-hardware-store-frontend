import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { MaterialModule } from '../shared/material.module';
import { ProductsComponent } from './components/products/products.component';
import { BannerComponent } from './components/banner/banner.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductTypePipe } from './pipes/product-type.pipe';

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductsComponent,
    BannerComponent,
    SearchComponent,
    ProductTypePipe
  ],
  exports: [ProductItemComponent],
  imports: [CommonModule, MaterialModule, FormsModule, BrowserAnimationsModule]
})
export class ShopModule {}
