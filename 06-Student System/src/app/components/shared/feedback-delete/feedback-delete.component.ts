import { Component, OnInit, Input } from '@angular/core';

import { FeedbackViewModel } from '../../../core/models/view-models/feedbacks/feedback.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { FeedbackService } from '../../../core/services/feedbacks/feedback.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';
import styleConstants from '../../../core/constants/style-constants';

@Component({
  selector: 'app-feedback-delete',
  templateUrl: './feedback-delete.component.html',
  styleUrls: ['./feedback-delete.component.css']
})
export class FeedbackDeleteComponent implements OnInit {
  @Input()
  feedbackToDelete: FeedbackViewModel;
  @Input()
  feedbacks: FeedbackViewModel[];
  regularStyle: string = styleConstants.warningButton;

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
        this.notificationService.successMsg(
          notificationMessages.feedbackDeletedMsg
        );

        // Remove deleted from feedbacks
        this.feedbackService.removeFromViewList(
          this.feedbackToDelete.id,
          this.feedbacks
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
