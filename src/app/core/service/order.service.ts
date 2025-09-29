import { Injectable } from '@angular/core';
import { Order } from '../models/orderModel';
import { CartItem } from '../models/cartItemsModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private apiUrl = 'http://localhost:3000/ventas';

  constructor() { }

  confirmOrder(cartItems: CartItem[], total: number): void {
    const newOrder: Order = {
      id: this.generateOrderId(),
      items: cartItems,
      total: total,
      date: new Date(),
      //userId: 
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

  /*getOrdersByuser(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }*/

  saveOrder(order: Order): void {
    this.orders.push(order);
  }
}
