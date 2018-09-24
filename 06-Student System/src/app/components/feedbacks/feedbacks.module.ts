import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FeedbacksRoutingModule } from './feedbacks-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';
import { CourseFeedbacksAllComponent } from './course-feedbacks-all/course-feedbacks-all.component';
import { UserFeedbacksAllComponent } from './user-feedbacks-all/user-feedbacks-all.component';

@NgModule({
  declarations: [
    FeedbackCreateComponent,
    FeedbackEditComponent,
    CourseFeedbacksAllComponent,
    UserFeedbacksAllComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FeedbacksRoutingModule,
    SharedModule // shared buttons
  ],
  exports: [
    FeedbackCreateComponent,
    CourseFeedbacksAllComponent, // imported in Courses Module => Course Details
    UserFeedbacksAllComponent // imported in Users Module => User Profile
  ] // export shared components
})
export class FeedbacksModule {}
