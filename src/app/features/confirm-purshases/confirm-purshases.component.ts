import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../core/models/orderModel';
import { OrderService } from '../../core/service/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';


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
    private authService: AuthService,
    private router: Router
  ) { }

  getorder(userId: string): void {
    this.orderService.getOrdersByUserFromApi(userId).subscribe((orders: Order[]) => {
      this.order = orders[orders.length - 1]; // Devuelve la última orden realizada
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToOrderHistory(): void {
    this.router.navigate(['/orderHistory']);
  }

 ngOnInit(): void {
    const userId=this.authService.userId;
    if(userId){
      this.getorder(userId);
      
    }
    else{
      console.warn("nop se encontro el usuario")
    }

  }

}
