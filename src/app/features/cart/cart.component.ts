import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { Producto } from '../../core/models/ProductosModel';
import { ProductComponent } from '../../shared/product/product/product.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, ProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: Producto[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.getTotalPrice();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
