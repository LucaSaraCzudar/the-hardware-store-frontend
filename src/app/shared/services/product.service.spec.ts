import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductService } from './product.service';
import { ProductApiService } from './product-api.service';
import { Product } from '../../models/product';
import { ProductType } from '../../models/product-type';
import { of } from 'rxjs';

const mockProduct1: Product = {
  id: 'id1',
  name: 'name1',
  imageBase64: 'image1',
  price: 1,
  productType: ProductType.KEYBOARD,
  description: 'description1'
};

const mockProduct2: Product = {
  id: 'id2',
  name: 'name2',
  imageBase64: 'image2',
  price: 1,
  productType: ProductType.KEYBOARD,
  description: 'description2'
}

describe('ProductService', () => {
  let service: ProductService;
  let productApiServiceMock = jasmine.createSpyObj('productApiService',
    {
      'getAllProducts': of([mockProduct1, mockProduct2]),
      'filterProductsByName': of([mockProduct1])
    });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductApiService,
          useValue: productApiServiceMock,
        }
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', fakeAsync(() => {
      service.loadProducts();
      expect(productApiServiceMock.getAllProducts).toHaveBeenCalled();
      tick();
      expect(service['_products'].getValue()).toEqual([mockProduct1, mockProduct2]);
  }));

  it('should search products', fakeAsync(() => {
    const loadProductsSpy = spyOn(service, 'loadProducts');
    service.searchProducts('');
    expect(loadProductsSpy).toHaveBeenCalled();
    expect(productApiServiceMock.filterProductsByName).not.toHaveBeenCalled();

    service.searchProducts('name');
    expect(productApiServiceMock.filterProductsByName).toHaveBeenCalledWith('name');
    tick();
    expect(service['_products'].getValue()).toEqual([mockProduct1]);
  }));
});

