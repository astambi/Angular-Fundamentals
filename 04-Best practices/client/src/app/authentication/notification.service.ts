import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const errorTitle = 'Error';
const successTitle = 'Success';
const warningTitle = 'Warning';
const infoTitle = 'Info';
const loginRequiredMsg = 'Log in to complete this action';
const adminRequiredMsg = 'Log in as Administrator to complete this action';

@Injectable()
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  successMsg = message => this.toastr.success(message, successTitle);
  infoMsg = message => this.toastr.info(message, infoTitle);
  errorMsg = message => this.toastr.error(message, errorTitle);
  warningMsg = message => this.toastr.warning(message, warningTitle);

  loginRequiredMsg = () => this.infoMsg(loginRequiredMsg);
  adminRoleRequiredMsg = () => this.infoMsg(adminRequiredMsg);
}
