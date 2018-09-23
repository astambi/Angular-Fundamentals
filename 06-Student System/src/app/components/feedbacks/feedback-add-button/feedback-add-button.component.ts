import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feedback-add-button',
  templateUrl: './feedback-add-button.component.html',
  styleUrls: ['./feedback-add-button.component.css']
})
export class FeedbackAddButtonComponent implements OnInit {
  @Input('courseId')
  courseId: string;
  @Input('isEnrolled$')
  isEnrolled$: Observable<boolean>;

  ngOnInit() {}
}
