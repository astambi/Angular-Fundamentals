import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { AppState } from '../../store/app.state';
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
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loadRecipeToEdit();
  }

  loadRecipeToEdit() {
    this.id = this.route.snapshot.params.id;

    // update state
    this.recipeService.getToEditById(this.id).subscribe(data => {
      // get state
      this.store.pipe(select(state => state.recipes.toEdit)).subscribe(data => {
        this.recipeEditModel = data;
      });
    });
  }

  edit() {
    this.recipeService.edit(this.id, this.recipeEditModel).subscribe(data => {
      // no state to update
      this.toastr.success('Recipe edited', 'Success');
      this.router.navigate(['/recipes/list']);
    });
  }
}
