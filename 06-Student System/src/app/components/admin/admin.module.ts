import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin/admin.component';
import { AdminCreateCourseButtonComponent } from './admin-create-course-button/admin-create-course-button.component';
import { CourseAdministrationComponent } from './course-administration/course-administration.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCreateCourseButtonComponent,
    CourseAdministrationComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
  exports: [AdminCreateCourseButtonComponent, CourseAdministrationComponent] // imported in course module => course details
})
export class AdminModule {}
