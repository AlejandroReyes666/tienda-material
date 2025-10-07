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
  cartItems$?: Observable<CartItem[]>;
  

  constructor(
    private http: HttpClient
  ) { }

  confirmOrder(cartItems: CartItem[], total: number,userId:any): void {
    
    const newOrder: Order = {
      id: this.generateOrderId(),
      items: [...cartItems],
      total: total,
      date: new Date(),
      userId:userId 
    }

    console.log("los  items en el confirm order de la orden son ",newOrder.items)

    this.saveOrder(newOrder);
    this.saveOrderToApi(newOrder).subscribe({
      next: (order) => {
        console.log('Order saved to API:', order);
      },
      error: (error) => {
        console.error('Error saving order to API:', error);
      }
    });



    console.log('Order confirmed:', newOrder);


  }

  private generateOrderId(): string {
    return Math.random().toString(36).substr(2, 9);
  } 

  getOrders(): Order[] {
    return this.orders;
  }

  getOrdersByuser(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }
  
  getOrdersByUserFromApi(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`);
  }

 



  saveOrder(order: Order): void {
    this.orders.push(order);
  }

  saveOrderToApi(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
