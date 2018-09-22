import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CourseService } from '../../../core/services/courses/course.service';

@Component({
  selector: 'app-courses-all',
  templateUrl: './courses-all.component.html',
  styleUrls: ['./courses-all.component.css']
})
export class CoursesAllComponent implements OnInit {
  pageSize: number = 6;
  currentPage: number = 1;

  courses$: Observable<CourseViewModel[]>;

  constructor(
    private authService: AuthService, // html create course
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.courses$ = this.courseService.getAll();
  }

  changePage(targetPage) {
    this.currentPage = targetPage;
  }
}
