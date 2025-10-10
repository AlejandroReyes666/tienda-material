import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { RouterLink, RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,CommonModule,MatIcon,MatSidenav,MatSidenavModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private AuthService: AuthService,
              private router: Router
  ) { }

  get isLoggedIn() {
    return this.AuthService.IsLoggedIn;
  }

  get currentRole() {
    return this.AuthService.CurrentRole;
  }

  get username(): string | null {
    return this.AuthService.username;
  }

  handleAuthAction() {
    if (this.isLoggedIn) {
      this.AuthService.loggedOut();
      this.router.navigate(['/login']);
    }
  }

}


