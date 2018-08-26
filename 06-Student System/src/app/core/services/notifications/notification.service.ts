import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const errorTitle = 'Error';
const infoTitle = 'Info';
const successTitle = 'Success';
const warningTitle = 'Warning';

const adminRequiredMsg = 'Login with admin credentials required';
const adminRequiredTitle = 'Admin access';
const alreadyLoggedInMsg = 'Logout to change credentials';
const alreadyLoggedInTitle = 'Already logged in';
const loginRequiredMsg = 'Login required';
const loginRequiredTitle = 'Authenticated access';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  errorMsg = message => this.toastr.error(message, errorTitle);
  infoMsg = message => this.toastr.info(message, infoTitle);
  successMsg = message => this.toastr.success(message, successTitle);
  warningMsg = message => this.toastr.warning(message, warningTitle);

  adminRoleRequiredMsg = () =>
    this.toastr.info(adminRequiredMsg, adminRequiredTitle);
  alreadyLoggedInMsg = () =>
    this.toastr.info(alreadyLoggedInMsg, alreadyLoggedInTitle);
  loginRequiredMsg = () =>
    this.toastr.info(loginRequiredMsg, loginRequiredTitle);
}
