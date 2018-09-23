import { Component, OnInit, Input } from '@angular/core';

import { FeedbackViewModel } from '../../../core/models/view-models/feedbacks/feedback.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { FeedbackService } from '../../../core/services/feedbacks/feedback.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';

@Component({
  selector: 'app-feedback-delete-button',
  templateUrl: './feedback-delete-button.component.html',
  styleUrls: ['./feedback-delete-button.component.css']
})
export class FeedbackDeleteButtonComponent implements OnInit {
  @Input()
  feedbackToDelete: FeedbackViewModel;
  @Input()
  feedbacks: FeedbackViewModel[];

  constructor(
    private authService: AuthService,
    private feedbackService: FeedbackService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  deleteFeedback() {
    // Validation Admins and Authors only
    if (
      !(
        this.authService.isAdmin() ||
        this.authService.user.uid === this.feedbackToDelete.userId
      )
    ) {
      this.notificationService.errorMsg(
        notificationMessages.feedbackDeletedFailureMsg
      );
      return;
    }

    // Delete
    this.feedbackService
      .delete(this.feedbackToDelete)
      .then(data => {
        // console.log(data);
        // Remove from feedbacks list
        this.feedbackService.removeFromViewList(
          this.feedbackToDelete.id,
          this.feedbacks // Update feedbacks list
        );
        this.notificationService.successMsg(
          notificationMessages.feedbackDeletedMsg
        );
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(
          notificationMessages.feedbackDeletedFailureMsg
        );
      });
  }
}
