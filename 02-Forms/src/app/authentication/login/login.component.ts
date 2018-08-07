import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../../models/authentication/login.model';
import { AuthenticationService } from '../authService/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel;
  isError: boolean = false;
  errorMessage: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.model = new LoginModel('', '');
  }

  ngOnInit() {}

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(
      data => {
        // Clear Errors
        this.isError = false;

        // Save Session
        // this.authService.saveSession(data); // authtoken & username

        // Redirect
        // this.router.navigate(['/home']);
      },
      err => {
        this.isError = true;
        this.errorMessage = err.error.description;
      }
    );
  }
}
