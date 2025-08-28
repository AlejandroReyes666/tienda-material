import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Producto} from '../models/ProductosModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Producto[] = [];
  private cartItemsSubject = new BehaviorSubject<Producto[]>(this.cartItems);

  constructor() { 
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  addToCart(product: Producto): void {
    this.cartItems.push(product);
    this.updateCartItems(this.cartItems);
  }
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCartItems(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartItems(this.cartItems);
  }

  updateCartItems(items: Producto[]): void {
    this.cartItemsSubject.next([...this.cartItems]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems():Producto[] {
    return [...this.cartItems];
    
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.precio, 0);
  }
}
