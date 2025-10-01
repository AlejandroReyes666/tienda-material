import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/ProductosModel';
import { CartItem } from '../models/cartItemsModel';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(
    this.getCartFromStorage()
  );

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Escuchar cambios desde otras pestañas
    window.addEventListener('storage', (event) => {
      if (event.key === this.getCartKey()) {
        const updatedCart = JSON.parse(event.newValue || '[]');
        this.cartItems = updatedCart;
        this.cartItemsSubject.next([...this.cartItems]);
        console.log('Carrito actualizado desde otra pestaña:', this.cartItems);
      }
    });
  }

  private getCartKey(): string {
    const token = localStorage.getItem('token');
    return token ? `cart_${token}` : 'cart_guest';
  }

  private getCartFromStorage(): CartItem[] {
    const key = this.getCartKey();
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }

  private updateCartItems(items: CartItem[]): void {
    const key = this.getCartKey();
    this.cartItems = items;
    localStorage.setItem(key, JSON.stringify(this.cartItems));
    this.cartItemsSubject.next([...this.cartItems]);
    console.log('Carrito actualizado:', this.cartItems);
  }

  reloadCart(): void {
    const items = this.getCartFromStorage();
    this.cartItems = items;
    this.cartItemsSubject.next([...items]);
  }

  addToCart(product: Producto): void {
    const items = this.cartItemsSubject.getValue();
    const index = items.findIndex((item) => item.product.id === product.id);

    if (index > -1) {
      items[index].quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }

    this.updateCartItems(items);
  }

  removeFromCart(productId: number): void {
    const updated = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.updateCartItems(updated);
  }

  removeOneFromCart(product: Producto): void {
    const items = this.cartItemsSubject.getValue();
    const index = items.findIndex((item) => item.product.id === product.id);

    if (index > -1) {
      if (items[index].quantity > 1) {
        items[index].quantity -= 1;
      } else {
        items.splice(index, 1);
      }
      this.updateCartItems(items);
    }
  }

  clearCart(): void {
    this.updateCartItems([]);
  }

  getCartItems(): CartItem[] {
    console.log("los productos en el carrilto son  ejecutado el servicio" + this.cartItems);
    return [...this.cartItems];
  }

  getTotalPrice(): number {
  const items = this.cartItemsSubject.getValue();
  return items.reduce(
    (total, item) => total + item.product.precio * item.quantity,
    0
  );
}
}
