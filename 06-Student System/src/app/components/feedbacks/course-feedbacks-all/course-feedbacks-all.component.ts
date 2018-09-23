import { Component, OnInit, Input } from '@angular/core';

import { FeedbackViewModel } from '../../../core/models/view-models/feedbacks/feedback.view.model';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-course-feedbacks-all',
  templateUrl: './course-feedbacks-all.component.html',
  styleUrls: ['./course-feedbacks-all.component.css']
})
export class CourseFeedbacksAllComponent implements OnInit {
  @Input()
  feedbacks: Array<FeedbackViewModel>;

  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
