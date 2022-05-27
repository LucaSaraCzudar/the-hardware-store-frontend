import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsComponent } from './cart-items.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CartItem } from '../../../models/cart-item';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('CartItemsComponent', () => {
  let component: CartItemsComponent;
  let fixture: ComponentFixture<CartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatListModule
      ],
      declarations: [CartItemsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a snackbar after removing cart items', () => {
    const removeCartItemSpy = spyOn(
      component['cartService'],
      'removeCartItem'
    ).and.returnValue(of(new Response()));
    const snackbarSpy = spyOn(component['snackBar'], 'open');
    component.onRemove(cartItemMock);
    expect(removeCartItemSpy).toHaveBeenCalledWith(cartItemMock);
    expect(snackbarSpy).toHaveBeenCalledWith('mock removed from the cart', 'X');
  });

  it('should display a snackbar after failing to remove cart items', () => {
    const errorResponse = new HttpErrorResponse({ status: 400 });
    const removeCartItemSpy = spyOn(
      component['cartService'],
      'removeCartItem'
    ).and.returnValue(throwError(() => errorResponse));
    const snackbarSpy = spyOn(component['snackBar'], 'open');
    component.onRemove(cartItemMock);
    expect(removeCartItemSpy).toHaveBeenCalledWith(cartItemMock);
    expect(snackbarSpy).toHaveBeenCalledWith(
      'An error happened while removing the item from the cart',
      'X'
    );
  });
});

const cartItemMock: CartItem = {
  name: 'mock',
  id: 'id',
  price: 1,
  quantity: 1
};
