import { Component, Inject,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef,MatDialogActions,MatDialogContent,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../core/service/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cartItemsModel';
import { Order } from '../../core/models/orderModel';
import { OrderService } from '../../core/service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-dialiog',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions,CommonModule],
  templateUrl: './pay-dialiog.component.html',
  styleUrl: './pay-dialiog.component.scss'
})
export class PayDialiogComponent {

  cartItems$!: Observable<CartItem[]>;
  
  constructor(
    private payDialogRef: MatDialogRef<PayDialiogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Total: number },
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
    ){}

  confirmPayment(){
    const items = this.cartService.getCartItems();
    const total = this.getTotalPrice();
    this.payDialogRef.close({items, total});
    this.router.navigate(['/confirmPurshase']);
    this.orderService.confirmOrder(items, total);

  }

  cancel() {
    this.payDialogRef.close(false);
  }

  getTotalPrice(): number {
    return this.data.Total;
  }

  getitems():Observable<CartItem[]>{
   console.log("los productos en el carrilto son" + this.cartService.cartItems$);
   return this.cartService.cartItems$;
  }

 



  ngOnInit(): void {
    this.cartItems$ = this.getitems();
  }




}
