import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { CoursesRoutingModule } from './courses-routing.module';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';

import { CoursesAllComponent } from './courses-all/courses-all.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListingComponent } from './course-listing/course-listing.component';

@NgModule({
  declarations: [
    CoursesAllComponent,
    CourseCreateComponent,
    CourseDetailsComponent,
    CourseEditComponent,
    CourseListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    CoursesRoutingModule,
    FeedbacksModule // used in course details
  ]
})
export class CoursesModule {}
