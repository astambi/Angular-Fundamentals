import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '../authentication/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // console.log(err);

        switch (err.status) {
          // Unauthorized
          case 401:
            this.notificationService.errorMsg(err.error.message);
            break;
          // Bad request
          case 400:
            const errorsObj = err.error.errors;
            const messages = Object.keys(errorsObj)
              .map(e => errorsObj[e])
              .join(' ');
            this.notificationService.errorMsg(messages);
            break;
          default:
            break;
        }

        return throwError(err);
      })
    );
  }
}
