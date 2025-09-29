import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../core/models/orderModel';
import { OrderService } from '../../core/service/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirm-purshases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-purshases.component.html',
  styleUrl: './confirm-purshases.component.scss'

})
export class ConfirmPurshasesComponent implements OnInit {

  order!: Order;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  getorder(): Order {
    const orders = this.orderService.getOrders();
    return orders[orders.length - 1]; // Devuelve la última orden realizada
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

 ngOnInit(): void {
    const orders = this.orderService.getOrders();
    this.order = orders[orders.length - 1]; // Última orden realizada
  }

}
