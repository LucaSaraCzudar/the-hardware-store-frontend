import { Injectable, OnDestroy } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { CartApiService } from './cart-api.service';
import {
  BehaviorSubject,
  finalize,
  Observable,
  startWith,
  Subject,
  takeUntil
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  private unsubscribe = new Subject<void>();
  private readonly CART_OPEN_KEY = 'hw_store.cart_open';
  private readonly _cartItems = new BehaviorSubject<CartItem[]>([]);
  readonly cartItems$ = this._cartItems.asObservable();
  private readonly _cartUpdated = new Subject<void>();
  readonly cartUpdated$ = this._cartUpdated.asObservable();
  private readonly _cartOpened = new BehaviorSubject<boolean>(false);
  readonly cartOpened$ = this._cartOpened.asObservable();

  constructor(private readonly cartApiService: CartApiService) {
    const isCartOpenValue: string | null = localStorage.getItem(
      this.CART_OPEN_KEY
    );
    if (isCartOpenValue && JSON.parse(isCartOpenValue) === true) {
      this._cartOpened.next(true);
    }

    this.cartUpdated$
      .pipe(startWith(undefined), takeUntil(this.unsubscribe))
      .subscribe(() => this.loadCart());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadCart(): void {
    this.cartApiService.getCartItems().subscribe((cartItems) => {
      this._cartItems.next(cartItems);
      localStorage.setItem(this.CART_OPEN_KEY, 'true');
      this._cartOpened.next(true);
    });
  }

  addCartItem(cartItem: CartItem): Observable<CartItem> {
    const existingCartItem = this._cartItems
      .getValue()
      .find((item) => item.id === cartItem.id);

    if (existingCartItem) {
      existingCartItem.quantity! += 1;

      return this.cartApiService
        .updateQuantity(existingCartItem)
        .pipe(finalize(() => this._cartUpdated.next()));
    }

    return this.cartApiService
      .addCartItem(cartItem)
      .pipe(finalize(() => this._cartUpdated.next()));
  }

  removeCartItem(cartItem: CartItem): Observable<Response> {
    return this.cartApiService
      .removeCartItem(cartItem.id)
      .pipe(finalize(() => this._cartUpdated.next()));
  }
}
