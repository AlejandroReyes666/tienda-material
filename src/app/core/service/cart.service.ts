import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/ProductosModel';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: Producto[] = [];
  private cartItemsSubject = new BehaviorSubject<Producto[]>(this.getCartFromStorage());

  cartItems$ = this.cartItemsSubject.asObservable(); // 👈 Exponemos el observable

  constructor() {
    // Escuchar cambios desde otras pestañas
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart') {
        const updatedCart = JSON.parse(event.newValue || '[]');
        this.cartItems = updatedCart;
        this.cartItemsSubject.next([...this.cartItems]);
      }
    });
  }

  private getCartFromStorage(): Producto[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  private updateCartItems(items: Producto[]): void {
    this.cartItems = items;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next([...this.cartItems]);
  }

  addToCart(product: Producto): void {
    const updated = [...this.cartItems, product];
    this.updateCartItems(updated);
  }

  removeFromCart(productId: number): void {
    const updated = this.cartItems.filter(item => item.id !== productId);
    this.updateCartItems(updated);
  }

  clearCart(): void {
    this.updateCartItems([]);
  }

  getCartItems(): Producto[] {
    return [...this.cartItems];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.precio, 0);
  }
}