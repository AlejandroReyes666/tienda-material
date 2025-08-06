import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';


@Component({
  selector: 'app-slider',
  standalone:true,
  imports: [SlickCarouselModule,CommonModule,MatIconModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})


export class SliderComponent {

  @ViewChild('slickModal', { static: false }) slickModal!: SlickCarouselComponent;

bannerSlides = [
  {
    img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80',
    title: 'Bienvenido a Nuestro Sitio',
    text: 'Explora nuestras categorías y productos destacados.'
  },
  {
    img: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1600&q=80',
    title: 'Ofertas Exclusivas',
    text: 'Descubre las promociones de esta semana.'
  },
  {
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
    title: 'Productos de Calidad',
    text: 'Seleccionados cuidadosamente para ti.'
  },
  {
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    title: 'Compra Segura',
    text: 'Tus datos protegidos en cada transacción.'
  },
  {
    img: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1600&q=80',
    title: 'Atención al Cliente',
    text: 'Estamos para ayudarte las 24 horas.'
  }
];


  
  
  
    slideConfig = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
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
  

}
