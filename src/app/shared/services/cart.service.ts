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
  private readonly _cartItemsCount = new BehaviorSubject<number>(0);
  readonly cartItemsCount$ = this._cartItemsCount.asObservable();
  private readonly _cartUpdated = new Subject<void>();
  readonly cartUpdated$ = this._cartUpdated.asObservable();
  readonly cartOpened$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly cartApiService: CartApiService) {
    this.loadSidebarSettings();
    this.updateSidebarSettings();
    this.updateCart();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadSidebarSettings(): void {
    const isCartOpenValue: string | null = localStorage.getItem(
      this.CART_OPEN_KEY
    );
    if (isCartOpenValue && JSON.parse(isCartOpenValue) === true) {
      this.cartOpened$.next(true);
    }
  }

  updateSidebarSettings(): void {
    this.cartOpened$.subscribe((val: boolean) => {
      localStorage.setItem(this.CART_OPEN_KEY, val.toString());
    });
  }

  updateCart(): void {
    this.cartUpdated$
      .pipe(startWith(undefined), takeUntil(this.unsubscribe))
      .subscribe(() => this.loadCart());
  }

  loadCart(): void {
    this.cartApiService.getCartItems().subscribe((cartItems) => {
      this._cartItems.next(cartItems);
      this.countCartItems(cartItems);
    });
  }

  countCartItems(cartItems: CartItem[]): void {
    let cartItemsCount = 0;
    if (cartItems.length > 0) {
      cartItemsCount = cartItems.reduce(
        (acc, one) => acc + (one.quantity || 1),
        0
      );
    }
    this._cartItemsCount.next(cartItemsCount);
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

    return this.cartApiService.addCartItem(cartItem).pipe(
      finalize(() => {
        this._cartUpdated.next();
        localStorage.setItem(this.CART_OPEN_KEY, 'true');
        this.cartOpened$.next(true);
      })
    );
  }

  removeCartItem(cartItem: CartItem): Observable<Response> {
    return this.cartApiService
      .removeCartItem(cartItem.id)
      .pipe(finalize(() => this._cartUpdated.next()));
  }
}
