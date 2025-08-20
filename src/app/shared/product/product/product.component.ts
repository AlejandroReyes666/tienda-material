import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { Producto } from '../../../core/models/ProductosModel';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DialogEliminarComponent } from '../../../shared/dialogEliminar/dialog-eliminar/dialog-eliminar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product',
  standalone:true,
  imports: [MatCardModule, MatButtonModule, DialogEliminarComponent, MatIcon, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  @Input() Product!:Producto
  @Output() editar = new EventEmitter<Producto>();
  @Output() eliminar= new EventEmitter<number>();

  isAdmin: boolean = false;

  constructor( 
    private dialog: MatDialog, private AuthService: AuthService){
   
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

  ngOnInit(): void {
   this.AuthService.role$.subscribe(role => {
      this.isAdmin = role === 'administrador';
    });
  }

  }

