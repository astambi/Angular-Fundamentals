import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FeedbacksRoutingModule } from './feedbacks-routing.module';

import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';
import { FeedbacksAllComponent } from './feedbacks-all/feedbacks-all.component';

@NgModule({
  declarations: [
    FeedbackCreateComponent,
    FeedbackEditComponent
    // FeedbacksAllComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, FeedbacksRoutingModule]
})
export class FeedbacksModule {}
