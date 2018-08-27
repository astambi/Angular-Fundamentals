import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnonymousGuard } from '../../core/guards/authentication/anonymous.guard';
import { AuthGuard } from '../../core/guards/authentication/auth.guard';
import { AdminGuard } from '../../core/guards/authentication/admin.guard';

import { CoursesAllComponent } from './courses-all/courses-all.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'all' },
  {
    path: 'all',
    component: CoursesAllComponent
  },
  {
    path: 'create',
    canActivate: [AdminGuard],
    component: CourseCreateComponent
  },
  {
    path: 'details/:id',
    canActivate: [AuthGuard],
    component: CourseDetailsComponent
  },
  {
    path: 'edit/:id',
    canActivate: [AdminGuard],
    component: CourseEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
