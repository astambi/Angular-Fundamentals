import { Component, OnInit, Input } from '@angular/core';

import { FeedbackViewModel } from '../../../core/models/view-models/feedbacks/feedback.view.model';
import { FeedbackService } from '../../../core/services/feedbacks/feedback.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';

@Component({
  selector: 'app-user-feedbacks-listing',
  templateUrl: './user-feedbacks-listing.component.html',
  styleUrls: ['./user-feedbacks-listing.component.css']
})
export class UserFeedbacksListingComponent implements OnInit {
  @Input('feedbacks')
  feedbacks: Array<FeedbackViewModel>;

  constructor(
    private feedbackService: FeedbackService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  deleteFeedback(feedback: FeedbackViewModel) {
    this.feedbackService
      .delete(feedback)
      .then(data => {
        // console.log(data);
        this.feedbackService.removeFromViewList(feedback.id, this.feedbacks); // Update feedbacks in user profile
        this.notificationService.successMsg(
          notificationMessages.feedbackDeletedMsg
        );
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(error.error.error);
      });
  }
}
