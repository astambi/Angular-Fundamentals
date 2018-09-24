import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { sharedComponents } from '.';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';

@NgModule({
  declarations: [...sharedComponents, FeedbackAddComponent],
  imports: [CommonModule, RouterModule],
  exports: [...sharedComponents]
})
export class SharedModule {}
