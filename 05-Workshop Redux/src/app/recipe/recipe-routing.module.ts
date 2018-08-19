import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

// Lazy loading /recipes/...
const routes: Routes = [
  { path: '', pathMatch: 'full', component: RecipeStartComponent },
  { path: 'start', component: RecipeStartComponent },
  { path: 'create', component: RecipeCreateComponent },
  { path: 'list', component: RecipeListComponent },
  { path: 'details/:id', component: RecipeDetailsComponent },
  { path: 'edit/:id', component: RecipeEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {}
