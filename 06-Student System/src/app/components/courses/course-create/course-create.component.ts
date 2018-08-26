import { Component, OnInit } from '@angular/core';

import { CourseCreateModel } from '../../../core/models/input-models/courses/course-create.input.model';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  courseCreateModel: CourseCreateModel;
  trainers = [];

  constructor() {
    const date = new Date();
    console.log(date);
    console.log(Date.now());

    this.courseCreateModel = new CourseCreateModel(
      '',
      '',
      date,
      date,
      'trainerId'
    );
  }

  ngOnInit() {
    // get trainers
  }
}
