import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from '../../../core/services/courses/course.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';
import paths from '../../../core/constants/path-constants';
import styleConstants from '../../../core/constants/style-constants';

@Component({
  selector: 'app-course-delete-btn',
  templateUrl: './course-delete-btn.component.html',
  styleUrls: ['./course-delete-btn.component.css']
})
export class CourseDeleteBtnComponent implements OnInit {
  @Input()
  courseId: string;
  @Input()
  hasSpecialStyle: boolean = false;
  regularStyle: string = styleConstants.dangerButton;
  specialStyle: string = '';

  constructor(
    private router: Router,
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (this.hasSpecialStyle) {
      this.specialStyle = styleConstants.largeBlockButton;
    }
  }

  deleteCourse() {
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
