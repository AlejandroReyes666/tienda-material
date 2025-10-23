import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactFormComponent } from '../../../shared/contactForm/contact-form/contact-form.component';
import { ContactService } from '../../../core/service/contact.service';
import { ContactForm } from '../../../core/models/contactModel';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, MatIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {

  // Podrías cambiar este tipo según la ruta o un tab (para mostrar otro tipo de formulario)
  formContext: 'contact' | 'trabajo' = 'contact';

  constructor(
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute, 
    private router: Router
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

  ngOnInit(): void {
  this.route.url.subscribe(() => {
    const currentUrl = this.router.url;
    this.formContext = currentUrl.includes('workwithus') ? 'trabajo' : 'contact';
    console.log("Form context set to:", this.formContext);
    console.log("Current URL:", currentUrl);
  });
}

  }

