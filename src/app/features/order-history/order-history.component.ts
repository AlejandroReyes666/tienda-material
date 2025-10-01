import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/service/order.service';
import { AuthService } from '../../core/service/auth.service';
import { Order } from '../../core/models/orderModel';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {

  orders:Order[] = [];
  constructor(private orderService: OrderService, private authService: AuthService) { }

  getOrders() {
    const userId = this.authService.userId;
    if (userId) {
      this.orderService.getOrdersByUserFromApi(userId).subscribe({
        next: (orders) => {
          this.orders = orders;
          console.log('Orders fetched from API:', orders);
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


