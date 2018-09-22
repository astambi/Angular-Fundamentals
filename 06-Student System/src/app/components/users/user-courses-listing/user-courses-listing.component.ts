import { Component, OnInit, Input } from '@angular/core';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';

import { CourseService } from '../../../core/services/courses/course.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';

@Component({
  selector: 'app-user-courses-listing',
  templateUrl: './user-courses-listing.component.html',
  styleUrls: ['./user-courses-listing.component.css']
})
export class UserCoursesListingComponent implements OnInit {
  @Input('title')
  title: string;
  @Input('courses')
  courses: Array<CourseViewModel>;
  @Input('isEnrolled')
  isEnrolled: boolean = false;

  constructor(
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  cancelEnrollment(courseId: string, studentCourses: Array<CourseViewModel>) {
    this.courseService
      .cancelCourseEnrollment(courseId)
      .then(data => {
        console.log(data);
        this.courseService.removeFromViewList(courseId, this.courses); // Update courses in user-profile
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
