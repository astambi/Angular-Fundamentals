import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../store/app.state';
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
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loadRecipe();
  }

  loadRecipe() {
    this.id = this.route.snapshot.params.id;

    // update state
    this.recipeService.getById(this.id).subscribe(data => {
      // get state
      this.recipe$ = this.store.pipe(select(state => state.recipes.details));
    });
  }

  delete() {
    this.recipeService.delete(this.id).subscribe(data => {
      // no state to update
      this.toastr.success('Recipe deleted', 'Success');
      this.router.navigate(['/recipes/list']);
    });
  }
}
