import { Component, OnInit, Input } from '@angular/core';

import { FeedbackViewModel } from '../../../core/models/view-models/feedbacks/feedback.view.model';

@Component({
  selector: 'app-user-feedbacks-all',
  templateUrl: './user-feedbacks-all.component.html',
  styleUrls: ['./user-feedbacks-all.component.css']
})
export class UserFeedbacksAllComponent implements OnInit {
  @Input('feedbacks')
  feedbacks: Array<FeedbackViewModel>;

  ngOnInit() {}
}
