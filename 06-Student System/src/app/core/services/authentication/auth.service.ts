import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { RegisterInputModel } from '../../models/input-models/authentication/register.input.model';
import { LoginInputModel } from '../../models/input-models/authentication/login.input.model';

import { NotificationService } from '../notifications/notification.service';

const registrationSuccessMsg = 'Registration successful';
const loginSuccessMsg = 'Login successful';
const logoutSuccessMsg = 'Logout successful';
const loginPath = '/auth/login';
const homePath = '/home';
const usersCollection = 'users/';
const roles = 'roles';
const adminRole = 'admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user: firebase.User = null; // {uid, email, displayName}
  token: string = null;
  roles: Array<string> = [];

  private hasAdminRole: boolean = false;
  private auth: firebase.auth.Auth;
  private db: firebase.database.Database;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  ngOnInit(): void {
    this.loadCurrentUser(); // load user from storage
  }

  register(registerModel: RegisterInputModel) {
    this.clearUser();

    const { name, email, password } = registerModel;
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.getCurrentUser();
        this.updateUserProfile(name);
        this.saveUserToDb(name, email);

        this.loadCurrentUser();

        this.notificationService.successMsg(registrationSuccessMsg);
        this.router.navigate([homePath]);
      })
      .catch(err => this.notificationService.errorMsg(err.message));
  }

  login(loginModel: LoginInputModel) {
    this.clearUser();

    const { email, password } = loginModel;
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.loadCurrentUser();

        this.notificationService.successMsg(loginSuccessMsg);
        this.router.navigate([homePath]);
      })
      .catch(err => this.notificationService.errorMsg(err.message));
  }

  logout() {
    this.auth
      .signOut()
      .then(res => {
        this.clearUser();

        this.notificationService.successMsg(logoutSuccessMsg);
        this.router.navigate([loginPath]);
      })
      .catch(err => this.notificationService.errorMsg(err.message));
  }

  isAuthenticated(): boolean {
    this.getCurrentUser();
    return this.user !== null; // && this.token !== null && this.token !== undefined
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.hasAdminRole;
  }

  getCurrentUser(): firebase.User {
    this.user = this.auth.currentUser;
    return this.user;
  }

  getUserRoles(): Array<string> {
    if (!this.user) {
      return;
    }

    const id = this.user.uid;
    this.db
      .ref(`${usersCollection}/${id}/${roles}`)
      .once('value')
      .then(snapshot => {
        const rolesObj = snapshot.val();

        // No roles
        if (!rolesObj) {
          this.roles = [];
          this.hasAdminRole = false;
          return;
        }

        // Roles
        const roles = [];
        Object.keys(rolesObj).map(role => {
          if (rolesObj[role]) {
            roles.push(role);
          }
        });
        this.roles = roles;

        // Admin role
        this.hasAdminRole = roles.indexOf(adminRole) !== -1;
      })
      .catch(err => this.notificationService.errorMsg(err.message));
  }

  getUserToken(): string {
    if (!this.user) {
      this.token = null;
      return this.token;
    }

    this.user
      .getIdToken()
      .then(token => {
        this.token = token;
      })
      .catch(err => this.notificationService.errorMsg(err.message));

    return this.token;
  }

  loadCurrentUser() {
    this.getCurrentUser();
    this.getUserToken();
    this.getUserRoles();
  }

  private clearUser() {
    this.token = null;
    this.user = null;
    this.hasAdminRole = false;
  }

  private saveUserToDb(name: string, email: string) {
    if (!this.user) {
      return;
    }

    const id = this.user.uid;
    const roles = {
      // admin: true,
      student: true
    };
    this.db.ref(`${usersCollection}/${id}`).set({ id, email, name, roles });
  }

  private updateUserProfile(name: string) {
    if (!this.user) {
      return;
    }

    this.user.updateProfile({
      displayName: name,
      photoURL: null
    });
  }
}
