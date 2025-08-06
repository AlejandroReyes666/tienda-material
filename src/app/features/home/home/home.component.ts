import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Servicios } from '../../../core/models/ServiciosModel';
import { ServiciosService } from '../../../core/service/servicios.service';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../../shared/slider/slider.component';

@Component({

  selector: 'app-home',
  standalone:true,
  imports: [MatCardModule,MatIconModule,LayoutModule,
    FlexLayoutModule,CommonModule,SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
   servicios: Servicios[] = [];

  
  constructor(private serviciosService:ServiciosService){
  }

  ngOnInit(): void {

    this.serviciosService.getBeneficios().subscribe(data => {
      this.servicios = data;
    });
  }

}
