import { TestBed } from '@angular/core/testing';

import { ProductApiService } from './product-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Product } from '../../models/product';
import { ProductType } from '../../models/product-type';
import { environment } from '../../../environments/environment';

describe('ProductServiceService', () => {
  let service: ProductApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API to get all products', () => {
    const mockProducts: Product[] = [mockProduct1, mockProduct2];

    service.getAllProducts().subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/products`
    });

    req.flush(mockProducts);
  });

  it('should call the API to get filtered products', () => {
    const mockProducts: Product[] = [mockProduct1];
    const name = 'mock';

    service.filterProductsByName(name).subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/products/filters?name=${name}`
    });

    req.flush(mockProducts);
  });
});

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
};
