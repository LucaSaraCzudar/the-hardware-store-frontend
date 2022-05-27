import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { CartItem } from '../../../models/cart-item';
import { Product } from '../../../models/product';
import { ProductType } from '../../../models/product-type';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [ProductItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a snackbar after removing adding products', () => {
    const addCartItemSpy = spyOn(
      component['cartService'],
      'addCartItem'
    ).and.returnValue(of(cartItemMock));
    const snackbarSpy = spyOn(component['snackBar'], 'open');
    component.addToCart(productMock);
    expect(addCartItemSpy).toHaveBeenCalledWith(cartItemMock);
    expect(snackbarSpy).toHaveBeenCalledWith('mock added to the cart', 'X');
  });

  it('should display a snackbar after failing to add cart items', () => {
    const errorResponse = new HttpErrorResponse({ status: 500 });
    const addCartItemSpy = spyOn(
      component['cartService'],
      'addCartItem'
    ).and.returnValue(throwError(() => errorResponse));
    const snackbarSpy = spyOn(component['snackBar'], 'open');
    component.addToCart(productMock);
    expect(addCartItemSpy).toHaveBeenCalledWith(cartItemMock);
    expect(snackbarSpy).toHaveBeenCalledWith(
      'An error happened while adding the item to the cart',
      'X'
    );
  });
});

const productMock: Product = {
  id: 'id',
  price: 1,
  name: 'mock',
  productType: ProductType.CPU,
  description: 'description',
  imageBase64: 'image'
};
const cartItemMock: CartItem = {
  name: 'mock',
  id: 'id',
  price: 1
};
