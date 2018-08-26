import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/authentication/auth.service';
import { NotificationService } from '../../services/notifications/notification.service';

const homePath = '/home';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.check();
  }

  check(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this.notificationService.alreadyLoggedInMsg();
    // this.router.navigate([homePath]);
    return false;
  }
}
