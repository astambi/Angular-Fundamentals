import { Component, OnInit, Input } from '@angular/core';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';

@Component({
  selector: 'app-course-listing',
  templateUrl: './course-listing.component.html',
  styleUrls: ['./course-listing.component.css']
})
export class CourseListingComponent implements OnInit {
  @Input('course')
  course: CourseViewModel;

  ngOnInit() {}
}
