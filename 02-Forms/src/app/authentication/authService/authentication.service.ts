import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginModel } from '../../models/authentication/login.model';
import { RegisterModel } from '../../models/authentication/register.model';

const appKey = 'kid_HJwwhzzHX';
const appSecret = '4af6186a67af49a9ad743af99f06a48f';
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const basicAuth = 'Basic';
const kinveyAuth = 'Kinvey';
const authTokenName = 'authtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentAuthToken: string;

  constructor(private httpClient: HttpClient) {}

  login(model: LoginModel) {
    return this.httpClient.post(loginUrl, JSON.stringify(model), {
      headers: this.createAuthHeaders(basicAuth)
    });
  }

  register(model: RegisterModel) {
    const { confirmPassword, ...modelData } = model;
    
    return this.httpClient.post(registerUrl, JSON.stringify(modelData), {
      headers: this.createAuthHeaders(basicAuth)
    });
  }

  logout() {
    return this.httpClient.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders(kinveyAuth)
      }
    );
  }

  isLogged() {
    return (
      this.currentAuthToken !== null &&
      this.currentAuthToken === localStorage.getItem(authTokenName)
    );
  }

  get authtoken() {
    return this.currentAuthToken;
  }

  set authtoken(value: string) {
    this.currentAuthToken = value;
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === basicAuth) {
      const auth = btoa(`${appKey}:${appSecret}`);

      return new HttpHeaders({
        Authorization: `${basicAuth} ${auth}`,
        'Content-Type': 'application/json'
      });
    }

    // Kinvey
    const authToken = localStorage.getItem(authTokenName);

    return new HttpHeaders({
      Authorization: `${kinveyAuth} ${authToken}`,
      'Content-Type': 'application/json'
    });
  }
}
