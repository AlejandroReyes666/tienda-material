import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { ProductComponent } from '../../shared/product/product/product.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../../core/models/cartItemsModel';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PayDialiogComponent } from '../../shared/pay-dialiog/pay-dialiog.component';
import { MatDialog } from '@angular/material/dialog';
import { CartEmptyComponent } from '../../shared/cart-empty/cart-empty.component';
import { RouterLink, Router } from '@angular/router';
import { MatMenuContent } from "@angular/material/menu";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ProductComponent, MatIconModule, MatCardModule, PayDialiogComponent, RouterLink, CartEmptyComponent, MatMenuContent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>; 
  totalPrice: number = 0;
  cartEmpty$: Observable<boolean>;
  private dialogOpened = false;

  constructor(
    private cartService: CartService,
    private payDialog: MatDialog,
    private emptyDialog: MatDialog,
    private router: Router
  ) {
    
     this.cartItems$ = this.cartService.cartItems$;
     this.cartEmpty$ = this.cartItems$.pipe( // ✅ Inicialización
      map(items => items.length === 0));
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

  openEmptyCartDialog(): void {
    const dialogRef = this.emptyDialog.open(CartEmptyComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'shop') {
        // Aquí puedes redirigir al usuario a la tienda o realizar otra acción  
        // Por ejemplo, si estás usando Angular Router:
        this.router.navigate(['/products']);
      } 
    });
  }

  ngOnInit(): void {
    this.cartEmpty$.subscribe(isEmpty => {
      if (isEmpty) {
        this.openEmptyCartDialog();
        this.dialogOpened = true;
      }});
    }

}
