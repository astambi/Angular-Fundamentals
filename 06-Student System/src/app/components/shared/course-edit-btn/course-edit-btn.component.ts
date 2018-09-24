import { Component, OnInit, Input } from '@angular/core';

import styleConstants from '../../../core/constants/style-constants';

@Component({
  selector: 'app-course-edit-btn',
  templateUrl: './course-edit-btn.component.html',
  styleUrls: ['./course-edit-btn.component.css']
})
export class CourseEditBtnComponent implements OnInit {
  @Input()
  courseId: string;
  @Input()
  hasSpecialStyle: boolean = false;
  regularStyle: string = styleConstants.warningButton;
  specialStyle: string = '';

  ngOnInit() {
    if (this.hasSpecialStyle) {
      this.specialStyle = styleConstants.largeBlockButton;
    }
  }
}
