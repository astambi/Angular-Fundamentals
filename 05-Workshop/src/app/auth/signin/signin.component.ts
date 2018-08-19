import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login(form: NgForm) {
    // NB without model
    const { email, password } = form.value;
    this.authService.signIn(email, password);
  }
}
