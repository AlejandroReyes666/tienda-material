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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import{MatNavList} from '@angular/material/list';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule, CommonModule, MatIcon, MatSidenav, MatSidenavModule, MatNavList],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile: boolean = false;
  contactExpanded = false;
  isDarkTheme: boolean = false;

  constructor(private AuthService: AuthService,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              private cdr: ChangeDetectorRef,
              private ngZone: NgZone
) {
  this.breakpointObserver.observe([Breakpoints.Handset])
    .subscribe(result => {
      this.ngZone.run(() => {
        this.isMobile = result.matches;
      });
    });

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      if (this.isMobile && this.sidenav?.opened) {
        this.sidenav.close();
      }
    });
}

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


  

  toggleContactMenu() {
    this.contactExpanded = !this.contactExpanded;    
  }

}


