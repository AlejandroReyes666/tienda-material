import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // Aquí verificamos si el usuario está logueado
    if (this.authService.IsLoggedIn) {
      console.log('Usuario logueado, acceso permitido');
      return true; // deja entrar a la ruta
    }
    console.log('Usuario no logueado, redirigiendo al login');

    // si no está logueado, lo redirige al login
    return this.router.createUrlTree(['/login']);
  }
}

