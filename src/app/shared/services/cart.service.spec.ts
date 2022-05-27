import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CartApiService } from './cart-api.service';
import { of } from 'rxjs';
import { CartItem } from '../../models/cart-item';

const mockCartItem1: CartItem = {
  id: 'id1',
  name: 'name1',
  quantity: 1,
  price: 10
};

const mockCartItem2: CartItem = {
  id: 'id2',
  name: 'name2',
  quantity: 2,
  price: 10
};

describe('CartService', () => {
  let service: CartService;
  let cartApiServiceMock = jasmine.createSpyObj('cartApiService', {
    getCartItems: of([mockCartItem1, mockCartItem2]),
    addCartItem: of(mockCartItem1),
    updateQuantity: of(mockCartItem2),
    removeCartItem: of(new Response())
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CartApiService,
          useValue: cartApiServiceMock
        }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load sidebar settings', fakeAsync(() => {
    service.cartOpened$.next(false);
    tick();
    localStorage.setItem('hw_store.cart_open', 'true');
    service.loadSidebarSettings();
    tick();
    expect(service.cartOpened$.getValue()).toBeTrue();
  }));

  it('should update sidebar settings', fakeAsync(() => {
    service.cartOpened$.next(false);
    tick();
    expect(localStorage.getItem('hw_store.cart_open')).toEqual('false');

    service.cartOpened$.next(true);
    tick();
    expect(localStorage.getItem('hw_store.cart_open')).toEqual('true');
  }));

  it('should reload cart on update', fakeAsync(() => {
    const spy = spyOn(service, 'loadCart');
    service.updateCart();
    service['_cartUpdated'].next();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should load the cart', fakeAsync(() => {
    const spy = spyOn(service, 'countCartItems');
    service.loadCart();
    tick();
    expect(cartApiServiceMock.getCartItems).toHaveBeenCalled();
    expect(service['_cartItems'].getValue()).toEqual([
      mockCartItem1,
      mockCartItem2
    ]);
    expect(spy).toHaveBeenCalledWith([mockCartItem1, mockCartItem2]);
  }));

  it('should count cart items', fakeAsync(() => {
    service.countCartItems([mockCartItem1]);
    tick();
    expect(service['_cartItemsCount'].getValue()).toEqual(1);

    service.countCartItems([mockCartItem1, mockCartItem2]);
    tick();
    expect(service['_cartItemsCount'].getValue()).toEqual(3);
  }));

  it('should add new cart item', fakeAsync(() => {
    const mockCartItem3: CartItem = {
      id: 'id3',
      name: 'name3',
      price: 1,
      quantity: 1
    };
    service.addCartItem(mockCartItem3);
    tick();
    expect(cartApiServiceMock.addCartItem).toHaveBeenCalledWith(mockCartItem3);
    expect(localStorage.getItem('hw_store.cart_open')).toEqual('true');
    expect(service.cartOpened$.getValue()).toBeTrue();
  }));
});
