import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductComponent } from '../../../shared/product/product/product.component';
import { Producto } from '../../../core/models/ProductosModel';
import { ProductoServiceService } from '../../../core/service/producto.service';
import { CommonModule } from '@angular/common';
import { ProductDialogComponent } from '../../../shared/productDialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductComponent, ProductDialogComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy{

  productos:Producto[]=[]
  constructor(private serviceProducto:ProductoServiceService,
    private dialog: MatDialog
  ){}

  obtenerProductos(){
    return this.serviceProducto.getProductos().subscribe(producto=>{
      this.productos=producto;

    })
  }


  openDialog(product?: Producto): void {
  const dialogRef = this.dialog.open(ProductDialogComponent, {
    width: '500px',

    data: product || null
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (product) {
        // editar
        console.log(" el producto resibido es ", product);
        this.serviceProducto.updateProduct(product.id, result).subscribe(() => this.obtenerProductos());
      } else {
        // crear
        this.serviceProducto.agregarProductos(result).subscribe(() => this.obtenerProductos());
      }
    }
  });
}



eliminarProducto(id: number): void {
  this.serviceProducto.deleteProduct(id).subscribe(() => this.obtenerProductos());
}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngOnDestroy(): void {
    this.obtenerProductos();
  }
}
