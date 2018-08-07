import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginModel } from '../../models/authentication/login.model';
import { RegisterModel } from '../../models/authentication/register.model';

const appKey = 'kid_HJwwhzzHX';
const appSecret = '4af6186a67af49a9ad743af99f06a48f';
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const basicAuth = 'Basic';
const kinveyAuth = 'Kinvey';
const authtoken = 'authtoken';
const username = 'username';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentAuthToken: string;

  constructor(private httpClient: HttpClient) {}

  login(model: LoginModel) {
    return this.httpClient.post(loginUrl, JSON.stringify(model));
  }

  register(model: RegisterModel) {
    const { confirmPassword, ...modelData } = model;
    return this.httpClient.post(registerUrl, JSON.stringify(modelData));
  }

  logout() {
    return this.httpClient.post(logoutUrl, {});
  }

  isLogged(): boolean {
    return (
      this.currentAuthToken !== null &&
      this.currentAuthToken === localStorage.getItem(authtoken)
    );
  }

  get authtoken() {
    return this.currentAuthToken;
  }

  set authtoken(value: string) {
    this.currentAuthToken = value;
  }

  basicAuthentication(): string {
    const auth = btoa(`${appKey}:${appSecret}`);
    return `${basicAuth} ${auth}`;
  }

  tokenAuthentication(): string {
    const authToken = localStorage.getItem(authtoken);
    return `${kinveyAuth} ${authToken}`;
  }

  requiresBasicAuthentication(url: string): boolean {
    return url === loginUrl || url === registerUrl;
  }

  isLoginUrl(url: string): boolean {
    return url === loginUrl;
  }

  saveSession(data: Object) {
    const kinveyAuthtoken = data['_kmd'][authtoken];
    this.authtoken = kinveyAuthtoken;

    localStorage.setItem(authtoken, kinveyAuthtoken);
    localStorage.setItem(username, data[username]);
  }

  clearSession() {
    this.authtoken = null;

    localStorage.clear();
  }
}
