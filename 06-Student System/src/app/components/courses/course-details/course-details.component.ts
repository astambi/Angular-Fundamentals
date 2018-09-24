import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';
import { FeedbackViewModel } from '../../../core/models/view-models/feedbacks/feedback.view.model';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CourseService } from '../../../core/services/courses/course.service';
import { FeedbackService } from '../../../core/services/feedbacks/feedback.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';
import { UserService } from '../../../core/services/users/user.service';

import { notificationMessages } from '../../../core/constants/notification-constants';
import paths from '../../../core/constants/path-constants';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string;
  course: CourseViewModel;
  trainers: UserViewModel[];
  feedbacks: FeedbackViewModel[];
  isEnrolled$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, // used in html
    private courseService: CourseService,
    private feedbackService: FeedbackService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params.id;
    this.getCourse();

    this.feedbacks = this.feedbackService.getByCourse(this.courseId);
    // console.log(this.feedbacks);

    this.updateStatus();
  }

  getCourse(): any {
    // this.courseId = this.route.snapshot.params.id;
    this.courseService.getById(this.courseId).subscribe(
      (data: CourseViewModel) => {
        console.log(data);

        // No course
        if (!data) {
          this.notificationService.errorMsg(
            notificationMessages.courseNotFoundMsg
          );
          this.router.navigate([paths.coursesAllPath]);
          return;
        }

        // Course & trainers data
        this.course = data;
        this.trainers = this.userService.getMultipleByIds(this.course.trainers);
      },
      error => this.notificationService.errorMsg(error.message)
    );
  }

  updateStatus() {
    this.isEnrolled$ = this.courseService.isEnrolledInCourse(this.courseId);
  }
}
