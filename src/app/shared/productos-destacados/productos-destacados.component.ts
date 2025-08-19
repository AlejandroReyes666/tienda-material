import { Component, OnInit } from '@angular/core';
import { Producto } from '../../core/models/ProductosModel';
import { ProductoServiceService } from '../../core/service/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos-destacados',
  imports: [CommonModule, SlickCarouselModule,MatButtonModule,MatCardModule],
  templateUrl: './productos-destacados.component.html',
  styleUrl: './productos-destacados.component.scss'
})
export class ProductosDestacadosComponent implements OnInit {
  productosDestacados: Producto[] = [];

  constructor(private ProductoSevice:ProductoServiceService,
    private snackBar: MatSnackBar,
    private router:Router
    
  ){
  }
  
  obtenerProductosDestacados(){
    this.ProductoSevice.getProductosDestacados().subscribe({
    next: productos => this.productosDestacados = productos,
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

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    accessibility: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    // solución clave 👇
    afterChange: () => {
      // Quitar el foco de todos los elementos enfocados
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
};

verMas(){
  this.router.navigate(['/login']);
}



  ngOnInit(): void {

    this.obtenerProductosDestacados();
    
  }

}
