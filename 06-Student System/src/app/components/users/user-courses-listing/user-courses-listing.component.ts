import { Component, OnInit, Input } from '@angular/core';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';

import { CourseService } from '../../../core/services/courses/course.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

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

  removeFromCourses(courseId: string) {
    this.courseService.removeFromViewList(courseId, this.courses);
  }
}
