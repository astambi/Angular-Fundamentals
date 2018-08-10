import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

const errorTitle = 'Error';
const warningTitle = 'Warning';
const infoTitle = 'Info';
const successTitle = 'Success';
const unexpectedErrorMsg = 'An expected error occured';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

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
            this.toastr.error(err.error.message, errorTitle);
            break;
          // Bad request
          case 400:
            const errorsObj = err.error.errors;
            const messages = Object.keys(errorsObj)
              .map(e => errorsObj[e])
              .join(' ');
            this.toastr.error(messages, errorTitle);
            break;
          default:
            break;
        }

        return throwError(err);
      })
    );
  }
}
