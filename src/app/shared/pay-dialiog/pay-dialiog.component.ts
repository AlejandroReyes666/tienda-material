import { Component, Inject,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef,MatDialogActions,MatDialogContent,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartComponent } from '../../features/cart/cart.component';

@Component({
  selector: 'app-pay-dialiog',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions,CommonModule],
  templateUrl: './pay-dialiog.component.html',
  styleUrl: './pay-dialiog.component.scss'
})
export class PayDialiogComponent {
  constructor(
    private payDialogRef: MatDialogRef<PayDialiogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Total: number }

    ){}

  confirmPayment(){
    this.payDialogRef.close(true);
  }
  cancel() {
    this.payDialogRef.close(false);
  }

  getTotalPrice(): number {
  return this.data.Total;
}



}
