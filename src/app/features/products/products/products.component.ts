import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductComponent } from '../../../shared/product/product/product.component';
import { Producto } from '../../../core/models/ProductosModel';
import { ProductoServiceService } from '../../../core/service/producto.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-products',
  imports: [CommonModule,ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy{

  productos:Producto[]=[]
  constructor(private serviceProducto:ProductoServiceService){}

  obtenerProductos(){
    return this.serviceProducto.getProductos().subscribe(producto=>{
      this.productos=producto;

    })
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngOnDestroy(): void {
    this.obtenerProductos();
  }
}
