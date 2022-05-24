import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, map, pipe } from 'rxjs';
import { ProductApiService } from '../../../shared/services/product-api.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchForm') searchForm: NgForm | undefined;
  search: string = '';

  constructor(private readonly productService: ProductService) {}

  ngAfterViewInit(): void {
    this.searchForm!.valueChanges!
      .pipe(
        map(value => value.search),
        debounceTime(500)
      ).subscribe(value => {
      this.productService.searchProducts(value);
    });
  }
}
