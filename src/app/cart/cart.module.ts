import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { MaterialModule } from '../shared/material.module';
import { CartComponent } from './components/cart/cart.component';
import { TotalPricePipe } from './pipes/total-price.pipe';

@NgModule({
  declarations: [CartItemsComponent, CartComponent, TotalPricePipe],
  exports: [CartItemsComponent, CartComponent],
  imports: [CommonModule, MaterialModule]
})
export class CartModule {}
