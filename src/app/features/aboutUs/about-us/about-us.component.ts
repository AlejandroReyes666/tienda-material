import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDivider} from "@angular/material/divider";



@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDivider],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),

  ]
})
export class AboutUsComponent {

}
