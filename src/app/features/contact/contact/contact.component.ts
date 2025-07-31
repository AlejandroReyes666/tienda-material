import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactFormComponent } from '../../../shared/contactForm/contact-form/contact-form.component';
import { ContactService } from '../../../core/service/contact.service';
import { ContactForm } from '../../../core/models/contactModel';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {

  // Podrías cambiar este tipo según la ruta o un tab (para mostrar otro tipo de formulario)
  formContext: 'contact' | 'trabajo' = 'contact';

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

