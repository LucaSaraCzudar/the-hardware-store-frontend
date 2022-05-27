import { TestBed } from '@angular/core/testing';

import { CartApiService } from './cart-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment';
import { CartItem } from '../../models/cart-item';

describe('CartApiService', () => {
  let service: CartApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CartApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API to get all cart items', () => {
    const mockCartItems: CartItem[] = [mockCartItem1, mockCartItem2];

    service.getCartItems().subscribe((res) => {
      expect(res).toEqual(mockCartItems);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/cart-items`
    });

    req.flush(mockCartItems);
  });

  it('should call the API to add a cart item', () => {
    service.addCartItem(mockCartItem1).subscribe((res) => {
      expect(res).toEqual(mockCartItem1);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${environment.apiUrl}/cart-items`
    });
    expect(req.request.body).toEqual(mockCartItem1);

    req.flush(mockCartItem1);
  });

  it('should call the API to update the cart item quantity', () => {
    const id = mockCartItem2.id;
    service.updateQuantity(mockCartItem2).subscribe((res) => {
      expect(res).toEqual(mockCartItem2);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${environment.apiUrl}/cart-items/${id}`
    });
    expect(req.request.body).toEqual(2);

    req.flush(mockCartItem2);
  });

  it('should call the API to remove a cart item', () => {
    const id = mockCartItem1.id;
    const response = new Response();
    service.removeCartItem(id).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${environment.apiUrl}/cart-items/${id}`
    });

    req.flush(response);
  });
});

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
