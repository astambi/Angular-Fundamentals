import { Component, OnInit, Input } from '@angular/core';

import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

@Component({
  selector: 'app-course-trainers-listing',
  templateUrl: './course-trainers-listing.component.html',
  styleUrls: ['./course-trainers-listing.component.css']
})
export class CourseTrainersListingComponent implements OnInit {
  @Input('trainers')
  trainers: UserViewModel[];

  ngOnInit() {}
}
