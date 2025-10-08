import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/service/order.service';
import { AuthService } from '../../core/service/auth.service';
import { Order } from '../../core/models/orderModel';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {

  orders:Order[] = [];
  constructor(private orderService: OrderService, private authService: AuthService) { }

  getOrders() {
    console.log("ejeutando el llamado de get orders");
    const userId = this.authService.userId;
    console.log("el id del usuario es: ", userId);
    if (userId) {
      console.log(" ");
      this.orderService.getOrdersByUserFromApi(userId).subscribe({
        next: (orders) => {
          this.orders = orders;
          console.log('Orders fetched from API:', orders);
          console.log('tamaño de array', orders.length);
        },
        error: (error) => {
          console.error('Error fetching orders from API:', error);
        }
      });
    }
    
  }

  ngOnInit(): void {
    this.getOrders();
  }



  }


