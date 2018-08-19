import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeCreateModel } from './models/recipe-create.model';
import { RecipeListModel } from './models/recipe-list.model';

// Redux
import { AppState } from '../store/app.state';
import {
  GetAllRecipes,
  GetRecipeDetails,
  GetRecipeToEdit
} from '../store/actions/recipes.actions';

const baseRecipesUrl = 'https://angular-recipes-8d419.firebaseio.com/recipes/';
const jsonExt = '.json';
const recipesUrl = `${baseRecipesUrl}${jsonExt}`;
const recipeByIdUrl = (id: string) => `${baseRecipesUrl}${id}${jsonExt}`;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipesCashed: boolean = false; // cache

  constructor(
    private http: HttpClient,
    private store: Store<AppState> // store
  ) {}

  getAllRecipes() {
    // NB pipe => optimisation
    // this.http.get('...').pipe(
    //   map(x => x),
    //   filter(x => x !== null),
    //   map(x => x)
    // );
    // this.http
    //   .get('...')
    //   .map(x => x)
    //   .filter(x => x !== null);

    // if (this.recipesCashed) {
    //   return Observable.create();
    // }

    return this.http.get(recipesUrl).pipe(
      map((res: Response) => {
        const ids = Object.keys(res);
        const recipes: RecipeListModel[] = [];
        for (const id of ids) {
          recipes.push({ ...res[id], id });
        }

        // this.recipesCashed = true;

        this.store.dispatch(new GetAllRecipes(recipes)); // Update state
      })
    );

    // // with subscribe in service
    // this.http.get(recipesUrl).subscribe(
    //   map((res: Response) => {
    //     const ids = Object.keys(res);
    //     const recipes: RecipeListModel[] = [];
    //     for (const id of ids) {
    //       recipes.push({ ...res[id], id });
    //     }
    //     this.store.dispatch(new GetAllRecipes(recipes));
    //   })
    // );
  }

  create(body: RecipeCreateModel) {
    return this.http.post(recipesUrl, body);
  }

  getById(recipeId: string) {
    return this.getByIdPrivate(recipeId, recipe => {
      this.store.dispatch(new GetRecipeDetails(recipe));
    });
  }

  getToEditById(recipeId: string) {
    return this.getByIdPrivate(recipeId, recipe => {
      this.store.dispatch(new GetRecipeToEdit(recipe));
    });
  }

  edit(recipeId: string, body: RecipeCreateModel) {
    return this.http.patch(recipesUrl, {
      [recipeId]: body // patch {id: body}
    });
  }

  delete(recipeId: string) {
    return this.http.delete(recipeByIdUrl(recipeId));
  }

  private getByIdPrivate(recipeId: string, callback) {
    return this.http.get<RecipeCreateModel>(recipeByIdUrl(recipeId)).pipe(
      map((recipe: RecipeCreateModel) => {
        callback(recipe); // Update state
      })
    );
  }
}
