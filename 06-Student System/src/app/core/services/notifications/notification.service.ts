import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  notificationMessages,
  notificationTitles
} from '../../constants/notification-constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  errorMsg = message =>
    this.toastr.error(message, notificationTitles.errorTitle);
  infoMsg = message => this.toastr.info(message, notificationTitles.infoTitle);
  successMsg = message =>
    this.toastr.success(message, notificationTitles.successTitle);
  warningMsg = message =>
    this.toastr.warning(message, notificationTitles.warningTitle);

  adminRoleRequiredMsg = () =>
    this.toastr.info(
      notificationMessages.adminRequiredMsg,
      notificationTitles.adminRequiredTitle
    );
  alreadyLoggedInMsg = () =>
    this.toastr.info(
      notificationMessages.alreadyLoggedInMsg,
      notificationTitles.alreadyLoggedInTitle
    );
  loginRequiredMsg = () =>
    this.toastr.info(
      notificationMessages.loginRequiredMsg,
      notificationTitles.loginRequiredTitle
    );
}
