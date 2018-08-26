import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AdminGuard } from './core/guards/authentication/admin.guard';
import { AuthGuard } from './core/guards/authentication/auth.guard';

// Modules
import { AuthenticationModule } from './components/authentication/authentication.module';
import { AdminModule } from './components/admin/admin.module';
import { UsersModule } from './components/users/users.module';
import { CoursesModule } from './components/courses/courses.module';

// Components
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => AuthenticationModule
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => AdminModule
  },
  {
    path: 'courses',
    loadChildren: () => CoursesModule
  },
  { path: 'users', canActivate: [AuthGuard], loadChildren: () => UsersModule },
  {
    path: 'posts', // todo
    canActivate: [AuthGuard],
    component: PostsComponent
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
