import { Component, OnInit } from '@angular/core';
import { currentUserKey } from '../interceptors/jwt.interceptor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;

  constructor() {}

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem(currentUserKey));

    if (currentUser) {
      this.username = JSON.parse(localStorage.getItem(currentUserKey)).username;
    }
  }
}
