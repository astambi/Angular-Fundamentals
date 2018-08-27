import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesAllComponent } from './courses-all/courses-all.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';

@NgModule({
  declarations: [
    CoursesAllComponent,
    CourseCreateComponent,
    CourseDetailsComponent,
    CourseEditComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, CoursesRoutingModule]
})
export class CoursesModule {}
