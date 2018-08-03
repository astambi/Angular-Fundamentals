import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../../models/authentication/login.model';
import { AuthenticationService } from '../authService/authentication.service';

const authtoken = 'authtoken';
const username = 'username';

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
        // Session
        const kinveyAuthtoken = data['_kmd'][authtoken];
        this.authService.authtoken = kinveyAuthtoken;
        localStorage.setItem(authtoken, kinveyAuthtoken);
        localStorage.setItem(username, data[username]);

        this.isError = false;
        this.router.navigate(['/home']);
      },
      err => {
        // console.log(err);
        this.isError = true;
        this.errorMessage = err.error.description;
      }
    );
  }
}
