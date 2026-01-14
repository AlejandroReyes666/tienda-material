import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../core/models/ProductosModel';
import { ProductoServiceService } from '../../core/service/producto.service';
import { ProductComponent } from '../../shared/product/product/product.component';
@Component({
  selector: 'app-sales',
  imports: [CommonModule, ProductComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {
  constructor(private productoService: ProductoServiceService) {}
  productosEnOferta: Producto[] = [];

  obtenerProductosEnOferta() {
    this.productoService.getProductosEnOferta().subscribe({
      next: (productos) => {
        this.productosEnOferta = productos;
        this.finalizarOferta(); // Llama aquí, cuando ya tienes los productos
      },
      error: (err) =>
        console.error('Error al obtener productos en oferta:', err),
    });
  }

  finalizarOferta() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ignora la hora
    this.productosEnOferta = this.productosEnOferta.filter((producto) => {
      if (producto.enOferta && producto.fechaFinOferta) {
        const fechaFin = new Date(producto.fechaFinOferta);
        fechaFin.setHours(0, 0, 0, 0);
        console.log('La fecha de hoy es: ', hoy);
        console.log('La fecha de fin de oferta es: ', fechaFin);
        console.log('la fecha fin es: ' + fechaFin.getTime());
        if (fechaFin.getTime() <= hoy.getTime()) {
          producto.enOferta = false;
          producto.precioOferta = producto.precio;

          // Actualiza en el backend
          this.productoService.updateProduct(producto.id,producto).subscribe({
            next: () =>
              console.log(
                `Producto ${producto.nombre} actualizado correctamente`
              ),
            error: (err) =>
              console.error(
                `Error al actualizar producto ${producto.nombre}:`,
                err
              ),
          });

          return false; // Elimina de la lista de ofertas
        }
      }
      console.log('el producto en oferta es', producto.enOferta);
      return true; // Mantiene el producto
    });
  }

  ngOnInit(): void {
    this.obtenerProductosEnOferta();
  }
}
