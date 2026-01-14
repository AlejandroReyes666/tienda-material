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
import { UsersService } from '../../../core/service/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import{LoginResponse} from '../../../core/models/LoginResponse'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, 
    MatFormFieldModule, MatCardModule, FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isLoading = false; // para mostrar un spinner si es necesario

  isLoginMode = true; // modo actual (true=login, false=registro)

  loginForm = new FormGroup({ 
    username: new FormControl(''), // requerido solo en registro
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rol: new FormControl('cliente') // por defecto cliente
  });

  constructor( 
    private usersService: UsersService ,// inyectar el servicio de usuarios
    private snakbar: MatSnackBar, // inyectar el servicio de snackbar para notificaciones
    private router: Router,
    private authService: AuthService
  ) { }

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
    console.log('Form submitted:' + JSON.stringify(this.loginForm.value));

    this.isLoading = true; // iniciar el loading

    const userData: userForm = this.loginForm.value as userForm;

    if (this.loginForm.invalid) {
      this.snakbar.open('Por favor, completa todos los campos requeridos.', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isLoading = true;

    this.isLoginMode ? this.login(userData) : this.register(userData);
  }
    

  login(userData: userForm) {
    console.log('Login method called');
    
    this.usersService.login(userData.email ?? '', userData.password ?? '').subscribe(
      (response) => {
        this.isLoading = false; // detener el loading
        if (response) {

          this.authService.loggedSuccess(response[0].rol, response[0].token??'');
          //localStorage.setItem('username', response[0].userId ?? '');
          
          this.snakbar.open('Inicio de sesión exitoso', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/products']);
        } else {
          this.snakbar.open('Credenciales inválidas', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      },
      
      error => {
        this.isLoading = false;
        console.error('Error al iniciar sesión:', error);
         // detener el loading
         // mostrar mensaje de error
        this.snakbar.open('Error al iniciar sesión', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  register(userData: userForm) {
    console.log('Register method called');
    this.usersService.register(userData).subscribe(
      response => {
        this.isLoading = false; // detener el loading
        console.log('Usuario registrado:', response);
        this.snakbar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.isLoginMode = true; // cambiar a modo login
      },
      error => {
        this.isLoading = false; // detener el loading
        console.error('Error al registrar usuario:', error);
        this.snakbar.open('Error al registrar usuario', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }


  ngOnInit(): void {

  }
}
