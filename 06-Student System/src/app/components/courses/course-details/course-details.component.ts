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
const coursesAllPath = '/courses/all';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string;
  course: CourseViewModel;
  trainers;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, // used in html
    private courseService: CourseService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.courseId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getCourse();
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
    //
  }
}
