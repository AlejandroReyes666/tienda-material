import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Producto } from '../../../core/models/ProductosModel';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DialogEliminarComponent } from '../../../shared/dialogEliminar/dialog-eliminar/dialog-eliminar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  standalone:true,
  imports: [MatCardModule, MatButtonModule,DialogEliminarComponent,MatIcon],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() Product!:Producto
  @Output() editar = new EventEmitter<Producto>();
  @Output() eliminar= new EventEmitter<number>();

  constructor( 
    private dialog: MatDialog){
   
  }

  actualizarProducto(){
    console.log("El producto a actializar es ", this.Product);
    this.editar.emit(this.Product);
  }


 openDialogEliminar(product:Producto):void{
  const dialogRef = this.dialog.open(DialogEliminarComponent, {
    width: '550px',
    data: product || null
    
  });

  dialogRef.afterClosed().subscribe((productoIdEliminado: number | undefined) => {
    if (productoIdEliminado !== undefined) {
      this.eliminar.emit(productoIdEliminado);
    }
  });

}

}
