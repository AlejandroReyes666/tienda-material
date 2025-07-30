import { Component,ChangeDetectionStrategy,signal } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators,FormBuilder, FormGroup} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../core/service/contact.service';
import { ContactForm } from '../../../core/models/contactModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone:true,
  imports: [MatFormFieldModule, MatInputModule, 
    FormsModule, ReactiveFormsModule,
    FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {


  contact = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });
   
  errorMessages = {
    name: signal(''),
    email: signal(''),
    phone: signal(''),
    message: signal('')
  };

  constructor(private contactService:ContactService,private snackBar: MatSnackBar) {
     Object.entries(this.contact.controls).forEach(([key, control]) => {
      merge(control.statusChanges, control.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage(key as keyof typeof this.errorMessages, control));
    });
  }


   updateErrorMessage(field: keyof typeof this.errorMessages, control: FormControl) {
    if (control.hasError('required')) {
      this.errorMessages[field].set('Este campo es obligatorio');
    } else if (field === 'email' && control.hasError('email')) {
      this.errorMessages[field].set('Correo no válido');
    } else {
      this.errorMessages[field].set('');
    }
  }

  // Para acceder desde la plantilla fácilmente
  get controls() {
    return this.contact.controls;
  }

  resetFormulario():void{
    this.contact.reset();
  }

  enviarFormulario(){
    if(this.contact.valid){
      const formData: ContactForm= {
      name: this.contact.get('name')?.value || '',
      email: this.contact.get('email')?.value || '',
      phone: this.contact.get('phone')?.value || '',
      message: this.contact.get('message')?.value || ''
    };


      this.contactService.guardarPeticionesDeContacto(formData).subscribe({
        next:()=> {
            this.snackBar.open('Solicitud enviada con exito', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.resetFormulario();

        },
        error:(err)=> {
          this.snackBar.open(`Error ${err.message} al enviar la solicitud intente mas tarde`, 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });

        }
      })
    }

  }


}
