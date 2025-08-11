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
      next: (productos) => (this.productosEnOferta = productos),
      error: (err) => console.error('Error al obtener productos en oferta:', err)
    });
  }

  ngOnInit(): void {
    this.obtenerProductosEnOferta();
    
  }
}
