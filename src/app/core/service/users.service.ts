import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { userForm } from '../models/userModel';
import { map, catchError } from 'rxjs/operators';
import { LoginResponse } from '../models/LoginResponse';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http:HttpClient) { }

  login(email:string, password:string): Observable<userForm[] | null> {
    console.log('Attempting to login with:', { email, password });
    return this.http.get<userForm[]>(`${this.apiUrl}?email=${email}`)
      .pipe(
        map(users => {
          const user = users[0];
          if(users.length > 0 && users[0].password === password){
            
            const token = btoa(`${user.email}:${user.password}`);
            localStorage.setItem('token', token);
            console.log("el token es: ", token);
            localStorage.setItem('role', user.rol ?? '');
            localStorage.setItem('user', JSON.stringify(user));
            return [user];
          } else {
            console.error('Invalid email or password');
            return null;
          }
        }),
        catchError(() => {
          console.error('Error during login');
          return of(null);
        })
      );
  }

  register(user: userForm): Observable<userForm> {
    return this.http.post<userForm>(this.apiUrl, user)
      .pipe(
        map(newUser => {
          console.log('Respuesta de JSON Server:', newUser);
          const token = btoa(`${newUser.email}:${newUser.password}`);
          localStorage.setItem('token', token);
          localStorage.setItem('role', newUser.rol ?? '');
          localStorage.setItem('user', JSON.stringify(newUser));
          return newUser;
        }),
        catchError(error => {
          console.error('Error during registration:', error);
          throw error;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}