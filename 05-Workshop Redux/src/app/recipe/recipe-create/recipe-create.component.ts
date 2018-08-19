import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RecipeCreateModel } from '../models/recipe-create.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {
  recipeCreateModel: RecipeCreateModel;

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.recipeCreateModel = new RecipeCreateModel('', '', '');
  }

  create() {
    this.recipeService.create(this.recipeCreateModel).subscribe(data => {
      // dispatch action to update cache

      // no state to update
      this.toastr.success('Recipe created', 'Success');
      this.router.navigate(['/recipes/list']);
    });
  }
}
