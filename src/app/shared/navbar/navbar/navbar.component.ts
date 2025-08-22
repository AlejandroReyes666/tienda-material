import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { RouterLink, RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private AuthService: AuthService,
              private router: Router
  ) { }

  get isLoggedIn() {
    return this.AuthService.IsLoggedIn;
  }

  get currentRole() {
    return this.AuthService.CurrentRole;
  }

  handleAuthAction() {
    if (this.isLoggedIn) {
      this.AuthService.loggedOut();
      this.router.navigate(['/login']);
    }
  }

}
