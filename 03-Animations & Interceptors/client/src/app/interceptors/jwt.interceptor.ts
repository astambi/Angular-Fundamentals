import {
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
import { ToastrService } from 'ngx-toastr';

const currentUserKey = 'currentUser';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Attach authorization headers for logged in users
    const currentUser = JSON.parse(localStorage.getItem(currentUserKey));

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request).pipe(
      tap((res: HttpEvent<any>) => {
        // console.log(res);

        if (res instanceof HttpResponse && res.body.success) {
          // Success Notification
          this.toastr.success(res.body.message || '', 'Success');

          // After Registration
          if (res.url.endsWith('signup')) {
            this.router.navigate(['/signin']);
          }

          // After Login
          if (res.body.token) {
            // Save session
            this.saveToSession(res.body);
            this.router.navigate(['/furniture/all']);
          }

          // After Create
          if (res.url.endsWith('create')) {
            this.router.navigate(['/furniture/all']);
          }
        }
      })
    );
  }

  private saveToSession(data) {
    localStorage.setItem(
      currentUserKey,
      JSON.stringify({
        username: data.user.name,
        token: data.token
      })
    );
  }
}

export { currentUserKey };
