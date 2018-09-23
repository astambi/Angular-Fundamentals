import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FeedbackCreateModel } from '../../../core/models/input-models/feedbacks/feedback-create.input.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { FeedbackService } from '../../../core/services/feedbacks/feedback.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';
import paths from '../../../core/constants/path-constants';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {
  userId: string = null;
  courseId: string = null;
  feedbackCreateModel: FeedbackCreateModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private feedbackService: FeedbackService,
    private notificationService: NotificationService
  ) {
    this.userId = this.authService.getCurrentUser().uid;
    this.courseId = this.route.snapshot.params.id;
    // console.log(this.userId);
    // console.log(this.courseId);

    this.feedbackCreateModel = new FeedbackCreateModel(
      this.courseId,
      this.userId,
      '',
      ''
    );
  }

  ngOnInit() {}

  create() {
    console.log(this.feedbackCreateModel);

    // No User or Course
    if (!this.courseId || !this.userId) {
      this.notificationService.errorMsg(
        notificationMessages.invalidUserOrCourseMsg
      );
      this.router.navigate([paths.courseDetailsPath + this.courseId]);
      return;
    }

    // Create feedback
    this.feedbackService.create(this.feedbackCreateModel).then(data => {
      this.notificationService.successMsg(
        notificationMessages.feedbackCreatedMsg
      );
      this.router.navigate([paths.courseDetailsPath + this.courseId]);
    });
  }
}
