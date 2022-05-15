import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [ProductItemComponent],
  exports: [ProductItemComponent],
  imports: [CommonModule, MaterialModule]
})
export class ShopModule {}
