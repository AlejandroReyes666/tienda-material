import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor( private cartService:CartService
  ) {}
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private role = new BehaviorSubject<string | null>(
    localStorage.getItem('role')
  );

  isLoggedIn$ = this.loggedIn.asObservable();
  role$ = this.role.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  loggedSuccess(rol: string | null = null, token: string | null) {
    if (!token) return; // por seguridad, no guardamos si viene vacío
    localStorage.setItem('token', token);

    if (rol) {
      localStorage.setItem('role', rol);
    }
    this.loggedIn.next(true);
    this.role.next(rol);
    this.cartService.reloadCart();
    
  }

  loggedOut() {
      
    localStorage.removeItem('token');
    this.cartService.clearCart();
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.role.next(null);
    console.log('Logged out successfully');
  }

  

  get CurrentRole(): string | null {
    return this.role.value;
  }

  get IsLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
