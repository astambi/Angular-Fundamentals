import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RecipeCreateModel } from '../models/recipe-create.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  recipeCreateModel: RecipeCreateModel;

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.recipeCreateModel = new RecipeCreateModel('', '', '');
  }

  ngOnInit() {}

  create() {
    this.recipeService.createRecipe(this.recipeCreateModel).subscribe(data => {
      this.toastr.success('Recipe created', 'Success');
      this.router.navigate(['/recipes/list']);
    });
  }
}
