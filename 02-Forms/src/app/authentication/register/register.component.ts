import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterModel } from '../../models/authentication/register.model';
import { AuthenticationService } from '../authService/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;
  isError: boolean = false;
  errorMessage: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.model = new RegisterModel('', '', '', '', '', '', 18);
  }

  ngOnInit() {}

  register() {
    // console.log(this.model);
    this.authService.register(this.model).subscribe(
      data => {
        this.isError = false;
        this.router.navigate(['/login']);
      },
      err => {
        // console.log(err);
        this.isError = true;
        this.errorMessage = err.error.description;
      }
    );
  }
}
