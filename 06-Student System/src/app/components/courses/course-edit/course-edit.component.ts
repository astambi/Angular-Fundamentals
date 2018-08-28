import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseCreateModel } from '../../../core/models/input-models/courses/course-create.input.model';
import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';

import { CourseService } from '../../../core/services/courses/course.service';
import { UserService } from '../../../core/services/users/user.service';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';
import { NotificationService } from '../../../core/services/notifications/notification.service';

const courseNotFoundMsg = 'Course not found';
const courseEditedMsg = 'Course updated';
const courseUpdateFailureMsg = 'Unable to update course';
const coursesAllPath = '/courses/all';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courseId: string;
  courseEditModel: CourseCreateModel;
  trainers$: Observable<UserViewModel[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params.id;
    this.trainers$ = this.userService.getAll(); // all potential trainers
    this.getCourse();
  }

  getCourse(): any {
    this.courseService.getById(this.courseId).subscribe(
      (data: CourseViewModel) => {
        // No course
        if (!data) {
          this.notificationService.errorMsg(courseNotFoundMsg);
          this.router.navigate([coursesAllPath]);
          return;
        }

        // Course
        this.courseEditModel = data;
      },
      error => this.notificationService.errorMsg(error.message)
    );
  }

  edit() {
    console.log(this.courseEditModel);

    this.courseService.edit(this.courseId, this.courseEditModel).subscribe(
      data => {
        console.log(data);
        this.notificationService.successMsg(courseEditedMsg);
        this.router.navigate([coursesAllPath]);
      },
      error => {
        console.log(error);
        this.notificationService.errorMsg(courseUpdateFailureMsg);
      }
    );
  }
}
