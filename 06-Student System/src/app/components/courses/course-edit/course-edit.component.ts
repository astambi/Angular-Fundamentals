import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseCreateModel } from '../../../core/models/input-models/courses/course-create.input.model';
import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';

import { CourseService } from '../../../core/services/courses/course.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';
import { UserService } from '../../../core/services/users/user.service';

const courseNotFoundMsg = 'Course not found';
const coursesAllPath = '/courses/all';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courseId: string;
  courseEditModel: CourseCreateModel;
  trainers: any[];
  trainers$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.courseId = this.route.snapshot.params.id;
    this.trainers$ = this.userService.getAll();
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
        this.courseEditModel = data;
        this.trainers = this.userService.getUsersByIds(
          this.courseEditModel.trainerIds
        );
      },
      error => this.notificationService.errorMsg(error.message)
    );
  }

  edit() {
    // todo
  }
}
