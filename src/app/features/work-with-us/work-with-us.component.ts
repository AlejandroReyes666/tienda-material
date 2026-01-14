import { Component } from '@angular/core';
import { ContactFormComponent } from '../../shared/contactForm/contact-form/contact-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../core/service/contact.service';
import { ContactForm } from '../../core/models/contactModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-with-us',
  standalone:true,
  imports: [ContactFormComponent,CommonModule],
  templateUrl: './work-with-us.component.html',
  styleUrl: './work-with-us.component.scss'
})
export class WorkWithUsComponent {


  constructor(
      private contactService: ContactService,
      private snackBar: MatSnackBar
    ) {}


  enviarFormulario(formData: ContactForm) {
      this.contactService.guardarPeticionesDeContacto(formData).subscribe({
        next: () => {
          this.snackBar.open('Solicitud enviada con éxito', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        error: (err) => {
          this.snackBar.open(`Error: ${err.message}`, 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
    }
  }

