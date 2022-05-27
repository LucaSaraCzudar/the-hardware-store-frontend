import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchInput', {read: NgModel}) searchInput: NgModel | undefined;
  search: string = '';

  constructor(private readonly productService: ProductService) {}

  ngAfterViewInit(): void {
    this.searchInput!.valueChanges!
      .pipe(
        debounceTime(500)
      ).subscribe(value => {
      this.productService.searchProducts(value);
    });
  }
}
