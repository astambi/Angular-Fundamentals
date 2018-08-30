import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CourseService } from '../../../core/services/courses/course.service';
import { UserService } from '../../../core/services/users/user.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';
import { Observable } from 'rxjs';

const courseNotFoundMsg = 'Course not found';
const courseDeletedMsg = 'Course deleted';
const courseEnrolledMsg = 'Enrolled in course';
const courseCancelEnrollmentMsg = 'Course enrolled cancelled';
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
  isEnrolled: boolean = false;

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
    this.userService
      .isEnrolledInCourse(this.courseId)
      .subscribe(data => (this.isEnrolled = data));
  }

  getCourse(): any {
    // this.courseId = this.route.snapshot.params.id;
    this.courseService.getById(this.courseId).subscribe(
      (data: CourseViewModel) => {
        // No course
        if (!data) {
          this.notificationService.errorMsg(courseNotFoundMsg);
          this.router.navigate([coursesAllPath]);
          return;
        }
        // Course & trainers data
        this.course = data;
        this.trainers = this.userService.getUsersByIds(this.course.trainerIds);
      },
      error => this.notificationService.errorMsg(error.message)
    );
  }

  delete() {
    // this.courseId = this.route.snapshot.params.id;
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
    this.userService
      .enrollInCourseById(this.courseId)
      .then(data => {
        console.log(data);
        this.notificationService.successMsg(courseEnrolledMsg);
        this.router.navigate([coursesAllPath]);
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(error.error.error);
      });
  }

  cancelEnrollment() {
    this.userService
      .cancelEnrollment(this.courseId)
      .then(data => {
        console.log(data);
        this.notificationService.successMsg(courseCancelEnrollmentMsg);
        this.router.navigate([coursesAllPath]);
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(error.error.error);
      });
  }
}
