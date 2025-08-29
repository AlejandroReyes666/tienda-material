import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { Producto } from '../../core/models/ProductosModel';
import { ProductComponent } from '../../shared/product/product/product.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, ProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems$: Observable<Producto[]>; 
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
     this.cartItems$ = this.cartService.cartItems$;
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    
  }

  clearCart(): void {
    this.cartService.clearCart();
    
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
