import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CourseService } from '../../../core/services/courses/course.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';
import paths from '../../../core/constants/path-constants';

@Component({
  selector: 'app-course-administration',
  templateUrl: './course-administration.component.html',
  styleUrls: ['./course-administration.component.css']
})
export class CourseAdministrationComponent implements OnInit {
  @Input()
  courseId: string;

  constructor(
    private router: Router,
    private authService: AuthService, // in html
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  delete() {
    this.courseService.delete(this.courseId).subscribe(
      data => {
        this.notificationService.successMsg(
          notificationMessages.courseDeletedMsg
        );
        this.router.navigate([paths.coursesAllPath]);
      },
      error => {
        console.log(error);
        this.notificationService.errorMsg(error.message);
      }
    );
  }
}
