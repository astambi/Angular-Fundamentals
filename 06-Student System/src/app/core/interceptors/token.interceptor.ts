import {
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/authentication/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getUserToken();

    // Add auth header
    if (token) {
      req = req.clone({
        url: `${req.url}?auth=${token}`
      });
    }

    return next.handle(req);
  }
}
