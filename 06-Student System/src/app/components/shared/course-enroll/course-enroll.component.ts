import { Component, OnInit, Input } from '@angular/core';

import { CourseService } from '../../../core/services/courses/course.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';
import styleConstants from '../../../core/constants/style-constants';

@Component({
  selector: 'app-course-enroll',
  templateUrl: './course-enroll.component.html',
  styleUrls: ['./course-enroll.component.css']
})
export class CourseEnrollComponent implements OnInit {
  @Input()
  courseId: string;
  @Input()
  hasSpecialStyle: boolean = false;
  regularStyle: string = styleConstants.infoButton;
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

  enroll() {
    this.courseService
      .enrollInCourse(this.courseId)
      .then(data => {
        this.notificationService.successMsg(
          notificationMessages.courseEnrolledMsg
        );
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(error.error.error);
      });
  }
}
