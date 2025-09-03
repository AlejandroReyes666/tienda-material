import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/ProductosModel';
import { CartItem } from '../models/cartItemsModel';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());

  cartItems$ = this.cartItemsSubject.asObservable(); // 👈 Exponemos el observable

  constructor() {
    // Escuchar cambios desde otras pestañas
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart') {
        const updatedCart = JSON.parse(event.newValue || '[]');
        this.cartItems = updatedCart;
        this.cartItemsSubject.next([...this.cartItems]);
        console.log("emitiendo carrito:",this.cartItems);
      }
    });
  }

  private getCartFromStorage(): CartItem[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  private updateCartItems(items: CartItem[]): void {
    this.cartItems = items;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next([...this.cartItems]);
    console.log("emitiendo carrito:",this.cartItems);
  }

addToCart(product: Producto): void {
  const items = this.cartItemsSubject.getValue();
  const index = items.findIndex(item => item.product.id === product.id);

  if (index > -1) {
    items[index].quantity += 1;
  } else {
    items.push({ product, quantity: 1 }); // 👈 no product.Product
  }

  this.updateCartItems(items);
}


  removeFromCart(productId: number): void {
  const updated = this.cartItems.filter(item => item.product.id !== productId);
  this.updateCartItems(updated);
}

removeOneFromCart(product: Producto): void {
  const items = this.cartItemsSubject.getValue();
  const index = items.findIndex(item => item.product.id === product.id);

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
    alert("carrito vacio");
    this.updateCartItems([]);
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.precio*item.quantity), 0);
  }
}