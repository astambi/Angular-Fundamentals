import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { RecipeCreateModel } from '../models/recipe-create.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  id: string;
  recipe$: Observable<RecipeCreateModel>;

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
    this.recipe$ = this.recipeService.getById(this.id);
  }

  delete() {
    this.recipeService.deleteRecipe(this.id).subscribe(data => {
      this.toastr.success('Recipe deleted', 'Success');
      this.router.navigate(['/recipes/list']);
    });
  }
}
