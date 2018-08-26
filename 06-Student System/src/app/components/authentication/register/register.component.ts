import { Component, OnInit } from '@angular/core';

import { RegisterInputModel } from '../../../core/models/input-models/authentication/register.input.model';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: RegisterInputModel;

  constructor(private authService: AuthService) {
    this.registerModel = new RegisterInputModel('', '', '');
  }

  ngOnInit() {}

  register() {
    this.authService.register(this.registerModel);
  }
}
