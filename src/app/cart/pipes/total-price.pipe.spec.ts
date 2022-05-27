import { TotalPricePipe } from './total-price.pipe';
import { CartItem } from '../../models/cart-item';

describe('TotalPricePipe', () => {
  const pipe = new TotalPricePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the total price of the cart items', () => {
    const cartItemsMock = [
      cartItemMock1, cartItemMock2
    ]
    expect(pipe.transform(cartItemsMock)).toEqual(40.61);
  });

  it('should return the total price of the cart items multiplied by their quantities', () => {
    const cartItemsMock = [
      cartItemMock2, cartItemMock3
    ]
    expect(pipe.transform(cartItemsMock)).toEqual(45.11);
  });

  it('should return 0 with no cart items present', () => {
    expect(pipe.transform([])).toEqual(0);
  });
});

const cartItemMock1: CartItem = {
  id: 'id1',
  name: 'name1',
  quantity: 1,
  price: 10.5
}

const cartItemMock2: CartItem = {
  id: 'id2',
  name: 'name2',
  quantity: 1,
  price: 30.11
}

const cartItemMock3: CartItem = {
  id: 'id3',
  name: 'name',
  quantity: 3,
  price: 5
}
