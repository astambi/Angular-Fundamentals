import { Component, OnInit, Input } from '@angular/core';

import { CourseService } from '../../../core/services/courses/course.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';
import styleConstants from '../../../core/constants/formatting-constants';

@Component({
  selector: 'app-course-enroll-cancel',
  templateUrl: './course-enroll-cancel.component.html',
  styleUrls: ['./course-enroll-cancel.component.css']
})
export class CourseEnrollCancelComponent implements OnInit {
  @Input()
  courseId: string;
  @Input()
  hasSpecialStyle: boolean = false;
  regularStyle: string = styleConstants.warningButton;
  specialStyle: string = '';

  constructor(
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (this.hasSpecialStyle) {
      this.specialStyle = styleConstants.largeButton;
    }
  }

  cancelEnrollment() {
    this.courseService
      .cancelCourseEnrollment(this.courseId)
      .then(data => {
        this.notificationService.successMsg(
          notificationMessages.courseCancelEnrollmentMsg
        );
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(error.error.error);
      });
  }
}
