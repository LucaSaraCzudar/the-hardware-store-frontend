import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Output() toggle = new EventEmitter<void>();

  cartItemsCount$ = this.cartService.cartItemsCount$;

  constructor(private readonly cartService: CartService) {}

  onToggle(): void {
    this.toggle.emit();
  }
}
