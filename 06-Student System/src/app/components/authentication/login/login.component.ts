import { Component, OnInit } from '@angular/core';

import { LoginInputModel } from '../../../core/models/input-models/authentication/login.input.model';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginInputModel;

  constructor(private authService: AuthService) {
    this.loginModel = new LoginInputModel('', '');
  }

  ngOnInit() {}

  login() {
    this.authService.login(this.loginModel);
  }
}
