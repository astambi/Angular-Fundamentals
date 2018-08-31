import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseCreateModel } from '../../../core/models/input-models/courses/course-create.input.model';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CourseService } from '../../../core/services/courses/course.service';
import { UserService } from '../../../core/services/users/user.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

const courseCreatedMsg = 'Course created';
const coursesAllPath = '/courses/all';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  courseCreateModel: CourseCreateModel;
  allTrainers$: Observable<UserViewModel[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.courseCreateModel = new CourseCreateModel('', '', null, null, []);
  }

  ngOnInit() {
    this.allTrainers$ = this.userService.getAll();
  }

  create() {
    // Admin only
    if (!this.authService.isAdmin()) {
      this.notificationService.adminRoleRequiredMsg();
      return;
    }

    console.log(this.courseCreateModel);

    this.courseService.create(this.courseCreateModel).then(data => {
      this.notificationService.successMsg(courseCreatedMsg);
      this.router.navigate([coursesAllPath]);
    });
  }
}
