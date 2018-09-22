import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseCreateModel } from '../../../core/models/input-models/courses/course-create.input.model';
import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';

import { CourseService } from '../../../core/services/courses/course.service';
import { UserService } from '../../../core/services/users/user.service';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';
import { NotificationService } from '../../../core/services/notifications/notification.service';

import { notificationMessages } from '../../../core/constants/notification-constants';
import paths from '../../../core/constants/path-constants';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courseId: string;
  courseEditModel: CourseCreateModel;
  allTrainers$: Observable<UserViewModel[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params.id;
    this.getCourse();
    this.allTrainers$ = this.userService.getAll();
  }

  getCourse(): any {
    this.courseService.getById(this.courseId).subscribe(
      (data: CourseViewModel) => {
        // No course
        if (!data) {
          this.notificationService.errorMsg(
            notificationMessages.courseNotFoundMsg
          );
          this.router.navigate([paths.coursesAllPath]);
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
        this.notificationService.successMsg(
          notificationMessages.courseEditedMsg
        );
        this.router.navigate([paths.courseDetailsPath + this.courseId]);
      },
      error => {
        console.log(error);
        this.notificationService.errorMsg(
          notificationMessages.courseUpdateFailureMsg
        );
      }
    );
  }
}
