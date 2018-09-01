import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbacksAllComponent } from './feedbacks-all/feedbacks-all.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'all' },
  // { path: 'all', component: FeedbacksAllComponent },
  { path: 'create/:id', component: FeedbackCreateComponent }
  // { path: 'edit/:id', component: FeedbackEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbacksRoutingModule {}
