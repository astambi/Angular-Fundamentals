import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './auth/guards/auth.guard';

// Modules
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: 'recipes',
    canActivate: [AuthGuard], // Authenticated only
    loadChildren: () => RecipeModule
  },
  { path: '**', redirectTo: '/auth/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
