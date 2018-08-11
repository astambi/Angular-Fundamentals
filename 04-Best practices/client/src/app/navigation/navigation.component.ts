import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../authentication/auth.service';
import { NotificationService } from '../authentication/notification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dropdownLi: string = 'nav-item dropdown';
  dropdownMenu: string = 'dropdown-menu';

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.notificationService.successMsg('You have logged out');
    this.router.navigate(['/signin']);
  }

  expand() {
    this.dropdownLi.endsWith('show')
      ? (this.dropdownLi = 'nav-item dropdown')
      : (this.dropdownLi = 'nav-item dropdown show');

    this.dropdownMenu.endsWith('show')
      ? (this.dropdownMenu = 'dropdown-menu')
      : (this.dropdownMenu = 'dropdown-menu show');
  }
}
