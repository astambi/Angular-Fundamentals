import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursesRoutingModule } from './courses-routing.module';

import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { CoursesAllComponent } from './courses-all/courses-all.component';

@NgModule({
  declarations: [
    CourseCreateComponent,
    CourseDetailsComponent,
    CourseEditComponent,
    CourseDeleteComponent,
    CoursesAllComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, CoursesRoutingModule]
})
export class CoursesModule {}
