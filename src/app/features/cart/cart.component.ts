import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { Producto } from '../../core/models/ProductosModel';
import { ProductComponent } from '../../shared/product/product/product.component';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cartItemsModel';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, ProductComponent, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>; 
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
     this.cartItems$ = this.cartService.cartItems$;
  }

  clearCart(): void {
    this.cartService.clearCart();
    
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
