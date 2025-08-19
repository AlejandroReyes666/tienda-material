import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Servicios } from '../../../core/models/ServiciosModel';
import { ServiciosService } from '../../../core/service/servicios.service';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../../shared/slider/slider.component';
import { ProductosDestacadosComponent } from '../../../shared/productos-destacados/productos-destacados.component';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({

  selector: 'app-home',
  standalone:true,
  imports: [MatCardModule,MatIconModule,LayoutModule,
    FlexLayoutModule,CommonModule,SliderComponent,ProductosDestacadosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
   servicios: Servicios[] = [];

  
  constructor(private serviciosService:ServiciosService,
    private router:Router
  ){
  }

  verMas(){
  this.router.navigate(['/login']);
}

verOfertas(){
  this.router.navigate(['/sales']);
}

  ngOnInit(): void {

    this.serviciosService.getBeneficios().subscribe(data => {
      this.servicios = data;
    });
  }

}
