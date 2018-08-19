import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RecipeCreateModel } from '../models/recipe-create.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: string;
  recipeEditModel: RecipeCreateModel;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    this.id = this.route.snapshot.params.id;

    this.recipeService.getById(this.id).subscribe(data => {
      if (!data) {
        this.toastr.warning('Recipe does not exist', 'Warning');
        this.router.navigate(['/recipes/list']);
        return;
      }

      this.recipeEditModel = data;
    });
  }

  edit() {
    console.log(this.recipeEditModel);

    this.recipeService
      .editRecipe(this.id, this.recipeEditModel)
      .subscribe(data => {
        this.toastr.success('Recipe edited', 'Success');
        this.router.navigate(['/recipes/list']);
      });
  }
}
