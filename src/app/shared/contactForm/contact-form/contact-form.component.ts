import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContactForm } from '../../../core/models/contactModel';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  @Input() mode: 'contact' | 'trabajo' = 'contact';
  @Output() submitForm = new EventEmitter<ContactForm>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),

    // Campos opcionales si el modo es 'trabajo'
    position: new FormControl(''),
    linkedin: new FormControl(''),
  });

  errorMessages = {
    name: signal(''),
    email: signal(''),
    phone: signal(''),
    message: signal(''),
    position: signal(''),
    linkedin: signal('')
  };

  constructor() {
    for (const [key, control] of Object.entries(this.form.controls)) {
      merge(control.statusChanges, control.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.setError(key as keyof typeof this.errorMessages, control));
    }
  }

  private setError(field: keyof typeof this.errorMessages, control: FormControl) {
    if (control.hasError('required')) {
      this.errorMessages[field].set('Este campo es obligatorio');
    } else if (field === 'email' && control.hasError('email')) {
      this.errorMessages[field].set('Correo no válido');
    } else {
      this.errorMessages[field].set('');
    }
  }

  get controls() {
    return this.form.controls;
  }

  isWorkMode(): boolean {
    return this.mode === 'trabajo';
  }

  submit(): void {
    if (this.form.valid) {
      const value: ContactForm = {
        name: this.form.value.name ?? null,
        email: this.form.value.email ?? null,
        phone: this.form.value.phone ?? null,
        message: this.form.value.message ?? null,
    };

      if (this.isWorkMode()) {
    value.position = this.form.value.position ?? null;
    value.linkedin = this.form.value.linkedin ?? null;
      };

      // Limpieza si no es modo 'trabajo'
      if (!this.isWorkMode()) {
        delete value.position;
        delete value.linkedin;
      }

      this.submitForm.emit(value);
      this.form.reset();
    } else {
      Object.entries(this.form.controls).forEach(([key, control]) => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
    }
  }
}
