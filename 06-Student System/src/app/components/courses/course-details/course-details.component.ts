import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CourseService } from '../../../core/services/courses/course.service';
import { UserService } from '../../../core/services/users/user.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

const courseNotFoundMsg = 'Course not found';
const courseDeletedMsg = 'Course deleted';
const courseEnrolledMsg = 'Enrolled in course';
const courseCancelEnrollmentMsg = 'Course enrollment cancelled';
const coursesAllPath = '/courses/all';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string;
  course: CourseViewModel;
  trainers: UserViewModel[];
  isEnrolled$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, // used in html
    private courseService: CourseService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params.id;

    this.getCourse();

    this.isEnrolled$ = this.courseService.isEnrolledInCourse(this.courseId);
  }

  getCourse(): any {
    // this.courseId = this.route.snapshot.params.id;
    this.courseService.getById(this.courseId).subscribe(
      (data: CourseViewModel) => {
        console.log(data);
        // No course
        if (!data) {
          this.notificationService.errorMsg(courseNotFoundMsg);
          this.router.navigate([coursesAllPath]);
          return;
        }
        // Course & trainers data
        this.course = data;
        this.trainers = this.userService.getMultipleByIds(this.course.trainers);
      },
      error => this.notificationService.errorMsg(error.message)
    );
  }

  delete() {
    this.courseService.delete(this.courseId).subscribe(
      data => {
        console.log(data); // null
        this.notificationService.successMsg(courseDeletedMsg);
        this.router.navigate([coursesAllPath]);
      },
      error => {
        console.log(error);
        this.notificationService.errorMsg(error.message);
      }
    );
  }

  enroll() {
    this.courseService
      .enrollInCourse(this.courseId)
      .then(data => {
        console.log(data);
        this.notificationService.successMsg(courseEnrolledMsg);
        this.isEnrolled$ = this.courseService.isEnrolledInCourse(this.courseId);
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(error.error.error);
      });
  }

  cancelEnrollment() {
    this.courseService
      .cancelCourseEnrollment(this.courseId)
      .then(data => {
        console.log(data);
        this.notificationService.successMsg(courseCancelEnrollmentMsg);
        this.isEnrolled$ = this.courseService.isEnrolledInCourse(this.courseId);
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(error.error.error);
      });
  }
}
