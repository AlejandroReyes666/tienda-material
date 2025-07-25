import { Component,Input } from '@angular/core';
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

}
