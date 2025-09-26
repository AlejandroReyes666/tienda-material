import { Injectable } from '@angular/core';
import { Order } from '../models/orderModel';
import { CartItem } from '../models/cartItemsModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  constructor() { }

  confirmOrder(cartItems: CartItem[], total: number): void {
    const newOrder: Order = {
      id: this.generateOrderId(),
      items: cartItems,
      total: total,
      date: new Date(),
    }
    this.saveOrder(newOrder);
    console.log('Order confirmed:', newOrder);


  }

  private generateOrderId(): string {
    return Math.random().toString(36).substr(2, 9);
  } 

  getOrders(): Order[] {
    return this.orders;
  }

  saveOrder(order: Order): void {
    this.orders.push(order);
  }
}
