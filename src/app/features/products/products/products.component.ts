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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../core/service/auth.service';
import{RouterModule} from '@angular/router';
import { routes } from '../../../app.routes';


@Component({
  selector: 'app-products',
  standalone:true,
  imports: [CommonModule, ProductComponent, ProductDialogComponent,
    MatButtonModule, MatIconModule, MatAutocompleteModule,
    MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy{
  categorias :string[]=[];
  productos:Producto[]=[];
  productosfiltrados:Producto[]=[];
  todosLosProductos: Producto[] = [];
  categoriaSeleccionada = '';

  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  constructor(private serviceProducto:ProductoServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ){}

obtenerProductos() {
  this.serviceProducto.getProductos().subscribe({
    next: producto => {
      this.todosLosProductos = producto;
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


obtenerCategorias(){
  this.serviceProducto.getProductos().subscribe({
    next: productos => {
      this.categorias = [...new Set(productos.map(p => p.categoria))];
      this.initAutocomplete();
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

obtenerProductosPorCategoria() {
  if (this.categoriaSeleccionada === ''|| !this.categoriaSeleccionada) {
    this.productos = this.todosLosProductos;
    return;
  }

  this.productos = this.todosLosProductos.filter(product =>
    product.categoria?.toLowerCase().includes(this.categoriaSeleccionada.toLowerCase())
  );
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


initAutocomplete(){
  this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
}


private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categorias.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  abrirAutocomplete() {
    const value = this.myControl.value;
    this.myControl.setValue(value ?? '');
  }

  resetform(){
    this.myControl.reset();
  }

  isloggedIn(): boolean {
    return this.authService.IsLoggedIn;
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  
  }



  ngOnDestroy(): void {
    
  }
}
