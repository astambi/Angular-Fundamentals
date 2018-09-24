import { Component, OnInit, Input } from '@angular/core';

import styleConstants from '../../../core/constants/style-constants';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.css']
})
export class FeedbackAddComponent implements OnInit {
  @Input('courseId')
  courseId: string;
  regularStyle: string = styleConstants.infoButton;

  ngOnInit() {}
}
