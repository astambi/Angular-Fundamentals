import { Component, OnInit, Input } from '@angular/core';

import styleConstants from '../../../core/constants/style-constants';

@Component({
  selector: 'app-course-add-btn',
  templateUrl: './course-add-btn.component.html',
  styleUrls: ['./course-add-btn.component.css']
})
export class CourseAddBtnComponent implements OnInit {
  @Input()
  hasSpecialStyle: boolean = false;
  regularStyle: string = styleConstants.infoButton;
  specialStyle: string = '';

  ngOnInit() {
    if (this.hasSpecialStyle) {
      this.specialStyle = styleConstants.largeButton;
    }
  }
}
