import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef,MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { Producto } from '../../../core/models/ProductosModel';

@Component({
  selector: 'app-dialog-eliminar',
  standalone:true,
  imports: [CommonModule, MatInputModule, MatButtonModule,MatDialogContent,MatDialogActions],
  templateUrl: './dialog-eliminar.component.html',
  styleUrl: './dialog-eliminar.component.scss',
})
export class DialogEliminarComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogEliminarComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Producto 
  ){}

  delete(){
    if(this.data){
       this.dialogRef.close(this.data.id);
    }

  }

  cancel() {
    this.dialogRef.close();
  }
}
