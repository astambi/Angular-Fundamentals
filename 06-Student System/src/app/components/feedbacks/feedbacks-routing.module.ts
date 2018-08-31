import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackAllComponent } from './feedback-all/feedback-all.component';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'all' },
  { path: 'all', component: FeedbackAllComponent },
  { path: 'create/:id', component: FeedbackCreateComponent },
  { path: 'edit/:id', component: FeedbackEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbacksRoutingModule {}
