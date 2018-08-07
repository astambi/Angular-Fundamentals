import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../authentication/authService/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = request.url;

    const authorisation = this.authService.requiresBasicAuthentication(url)
      ? this.authService.basicAuthentication()
      : this.authService.tokenAuthentication();

    request = request.clone({
      setHeaders: {
        Authorization: authorisation,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request).pipe(
      tap(
        (res: HttpEvent<any>) => {
          if (
            res instanceof HttpResponse &&
            this.authService.isLoginUrl(request.url)
          ) {
            // Save session
            this.authService.saveSession(res.body);

            // Redirect
            this.router.navigate(['/']);
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 401:
                this.router.navigate(['/login']);
                break;
              case 404:
                this.router.navigate(['/not-found']);
                break;
              default:
                this.router.navigate(['/']);
                break;
            }
          }
        }
      )
    );
  }
}
