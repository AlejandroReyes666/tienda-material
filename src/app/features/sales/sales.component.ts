import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto} from '../../core/models/ProductosModel';
import { ProductoServiceService } from '../../core/service/producto.service';
import { ProductComponent } from "../../shared/product/product/product.component";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sales',
  imports: [CommonModule, ProductComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
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
    error: (err) => console.error('Error al obtener productos en oferta:', err)
  });
}

finalizarOferta() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Ignora la hora
  this.productosEnOferta = this.productosEnOferta.filter(producto => {
    if (
      producto.enOferta && producto.fechaFinOferta) {
      const fechaFin = new Date(producto.fechaFinOferta);
      fechaFin.setHours(0, 0, 0, 0);
      console.log("La fecha de hoy es: ", hoy);
      console.log("La fecha de fin de oferta es: ", fechaFin);
      if (fechaFin.getTime() <= hoy.getTime()) {
        producto.enOferta = false;
        producto.precioOferta = producto.precio;
        return false; // Elimina el producto de la lista
      }
    }
    return true; // Mantiene el producto
  });
}

ngOnInit(): void {
  this.obtenerProductosEnOferta();
}


}
