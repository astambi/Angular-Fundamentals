import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase'; // Firebase

const regisrationSuccessMsg = 'Registration successful';
const loginSuccessMsg = 'Login successful';
const logoutSuccessMsg = 'Logout successful';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = null;

  constructor(private toastr: ToastrService, private router: Router) {}

  signUp(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.successMsg(regisrationSuccessMsg);
        this.router.navigate(['/auth/signin']);
      })
      .catch(err => this.errorMsg(err.message));
  }

  signIn(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        // Save token
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
          });

        this.successMsg(loginSuccessMsg);
        this.router.navigate(['/recipes/start']);
      })
      .catch(err => this.errorMsg(err.message));
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(res => {
        this.successMsg(logoutSuccessMsg);
        this.router.navigate(['/auth/signin']);
      })
      .catch(err => this.errorMsg(err.message));
  }

  getToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => {
        this.token = token;
      });

    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  successMsg = message => this.toastr.success(message, 'Success');
  errorMsg = message => this.toastr.error(message, 'Error');
}
