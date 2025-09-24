import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef,MatDialogActions,MatDialogContent,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-empty',
  standalone: true,
  imports: [ CommonModule,MatDialogContent,MatDialogActions,MatCardModule, MatIconModule],
  templateUrl: './cart-empty.component.html',
  styleUrl: './cart-empty.component.scss'
})
export class CartEmptyComponent {

  constructor(
   private emptyDialog: MatDialogRef<CartEmptyComponent>,
   private routes: Router
  ) {}

  closeDialog() {
    this.emptyDialog.close();
  }

  redirectToProducts() {
    this.routes.navigate(['/products']);
    this.closeDialog();
  }


  





}
