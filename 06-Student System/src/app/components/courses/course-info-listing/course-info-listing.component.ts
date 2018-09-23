import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

@Component({
  selector: 'app-course-info-listing',
  templateUrl: './course-info-listing.component.html',
  styleUrls: ['./course-info-listing.component.css']
})
export class CourseInfoListingComponent implements OnInit {
  @Input()
  course: CourseViewModel;
  @Input()
  isEnrolled$: Observable<boolean>;
  @Input()
  trainers: UserViewModel[];

  ngOnInit() {}
}
