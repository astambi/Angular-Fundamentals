import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../store/app.state';
import { RecipeListModel } from '../models/recipe-list.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<RecipeListModel[]>;

  constructor(
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    // update state
    this.recipeService.getAllRecipes().subscribe(data => {
      // get state
      this.recipes$ = this.store.pipe(select(state => state.recipes.all));
    });

    // // with subscribe in service
    // this.recipeService.getAllRecipes(); // update state
    // this.recipes$ = this.store.select(state => state.recipes.all); // get state
  }
}
