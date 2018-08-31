import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedbacksRoutingModule } from './feedbacks-routing.module';

import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';
import { FeedbackAllComponent } from './feedback-all/feedback-all.component';

@NgModule({
  declarations: [
    FeedbackCreateComponent,
    FeedbackEditComponent,
    FeedbackAllComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, FeedbacksRoutingModule]
})
export class FeedbacksModule {}
