import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { CoursesRoutingModule } from './courses-routing.module';
import { AdminModule } from '../admin/admin.module';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { SharedModule } from '../shared/shared.module';

import { CoursesAllComponent } from './courses-all/courses-all.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListingComponent } from './course-listing/course-listing.component';
import { CourseTrainersListingComponent } from './course-trainers-listing/course-trainers-listing.component';
import { CourseInfoListingComponent } from './course-info-listing/course-info-listing.component';

@NgModule({
  declarations: [
    CoursesAllComponent,
    CourseCreateComponent,
    CourseDetailsComponent,
    CourseEditComponent,
    CourseListingComponent,
    CourseTrainersListingComponent,
    CourseInfoListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    CoursesRoutingModule,
    AdminModule, // used in course details
    FeedbacksModule, // used in course details
    SharedModule // shared buttons
  ]
})
export class CoursesModule {}
