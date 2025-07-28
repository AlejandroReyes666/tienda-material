import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Producto } from '../../../core/models/ProductosModel';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-product',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() Product!:Producto
  @Output() editar = new EventEmitter<Producto>();
  @Output() eliminar= new EventEmitter<number>();

  actualizarProducto(){
    console.log("El producto a actializar es ", this.Product);
    this.editar.emit(this.Product);
  }

  eliminarProducto(){
    this.eliminar.emit(this.Product.id);
  }


}
