import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductComponent } from '../../../shared/product/product/product.component';
import { Producto } from '../../../core/models/ProductosModel';
import { ProductoServiceService } from '../../../core/service/producto.service';
import { CommonModule } from '@angular/common';
import { ProductDialogComponent } from '../../../shared/productDialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-products',
  standalone:true,
  imports: [CommonModule,ProductComponent,ProductDialogComponent,
    MatButtonModule,MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy{

  productos:Producto[]=[]
  constructor(private serviceProducto:ProductoServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

obtenerProductos() {
  this.serviceProducto.getProductos().subscribe({
    next: producto => {
      this.productos = producto;
    },
    error: err => {
      this.snackBar.open(err.message, 'Cerrar', {
        duration: 5000,
        panelClass: ['snackbar-error'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  });
}


openDialog(product?: Producto): void {
  const dialogRef = this.dialog.open(ProductDialogComponent, {
    width: '500px',
    data: product || null
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (product) {
        // Editar
        this.serviceProducto.updateProduct(product.id, result).subscribe({
          next: () =>{ 
            this.snackBar.open('Producto Actualizado correctamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.obtenerProductos()},
          error: err => {
            this.snackBar.open(`Error al actualizar: ${err.message}`, 'Cerrar', {
              duration: 5000,
              panelClass: ['snackbar-error'],
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        });
      } else {
        // Crear
        this.serviceProducto.agregarProductos(result).subscribe({
          next: () => {
            this.snackBar.open('Producto creado correctamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.obtenerProductos()
          },
          error: err => {
            this.snackBar.open(`Error al crear: ${err.message}`, 'Cerrar', {
              duration: 5000,
              panelClass: ['snackbar-error'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        });
      }
    }
  });
}




eliminarProducto(id: number): void {
  this.serviceProducto.deleteProduct(id).subscribe({
    next: () => {
      this.snackBar.open('Producto eliminado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.obtenerProductos();
    },
    error: err => {
      this.snackBar.open(`Error al eliminar: ${err.message}`, 'Cerrar', {
        duration: 5000,
        panelClass: ['snackbar-error'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  });
}


  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngOnDestroy(): void {
    
  }
}
