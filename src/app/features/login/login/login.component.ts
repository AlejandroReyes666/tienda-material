import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { userForm } from '../../../core/models/userModel';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, 
    MatFormFieldModule, MatCardModule, FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  isLoginMode = true; // modo actual (true=login, false=registro)

  loginForm = new FormGroup({
    username: new FormControl(''), // requerido solo en registro
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rol: new FormControl('cliente') // por defecto cliente
  });

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.loginForm.get('username')?.clearValidators();
    } else {
      this.loginForm.get('username')?.setValidators(Validators.required);
    }
    this.loginForm.get('username')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.isLoginMode) {
      console.log('🔑 Login con:', this.loginForm.value);
      // mañana implementamos login
    } else {
      console.log('🆕 Registro con:', this.loginForm.value);
      // mañana implementamos registro con rol
    }
  }
  ngOnInit(): void {
    // Inicializar el formulario si es necesario
    this.loginForm.reset();
  }
}
