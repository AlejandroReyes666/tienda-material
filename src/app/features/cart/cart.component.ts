import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { Producto } from '../../core/models/ProductosModel';
import { ProductComponent } from '../../shared/product/product/product.component';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cartItemsModel';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PayDialiogComponent } from '../../shared/pay-dialiog/pay-dialiog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ProductComponent, MatIconModule, MatCardModule, PayDialiogComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>; 
  totalPrice: number = 0;

  constructor(private cartService: CartService, private payDialog: MatDialog) {
     this.cartItems$ = this.cartService.cartItems$;
  }

  clearCart(): void {
    this.cartService.clearCart();
    
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  openPayDialog(): void {
    const dialogRef = this.payDialog.open(PayDialiogComponent, {
      width: '400px',
      data: { Total: this.getTotalPrice()||null }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clearCart();
      }});
  }
}
