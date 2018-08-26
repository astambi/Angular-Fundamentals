import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseCreateModel } from '../../../core/models/input-models/courses/course-create.input.model';

import { UserService } from '../../../core/services/users/user.service';
import { CourseService } from '../../../core/services/courses/course.service';
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
  trainers$: Observable<any>;

  constructor(
    private router: Router,
    private userService: UserService,
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {
    const date = new Date();
    this.courseCreateModel = new CourseCreateModel('', '', date, date, '');
  }

  ngOnInit() {
    this.trainers$ = this.userService.getAll();
  }

  create() {
    // console.log(this.courseCreateModel);
    this.courseService.create(this.courseCreateModel).then(data => {
      this.notificationService.successMsg(courseCreatedMsg);
      this.router.navigate([coursesAllPath]);
    });
  }
}
