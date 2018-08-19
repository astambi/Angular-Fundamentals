import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeCreateModel } from './models/recipe-create.model';
import { RecipeListModel } from './models/recipe-list.model';
import { AuthService } from '../auth/auth.service';

const baseRecipesUrl = 'https://angular-recipes-8d419.firebaseio.com/recipes/';
const jsonExt = '.json';
const recipesUrl = `${baseRecipesUrl}${jsonExt}`;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllRecipes() {
    return this.http.get(recipesUrl).pipe(
      map((res: Response) => {
        // Recipes with ids
        const ids = Object.keys(res);
        const recipes: RecipeListModel[] = [];

        for (const id of ids) {
          recipes.push({
            id, // adding recipe id
            ...res[id]
          });
        }

        return recipes;
      })
    );
  }

  createRecipe(body: RecipeCreateModel) {
    return this.http.post(recipesUrl, body);
  }

  getById(recipeId: string) {
    return this.http.get<RecipeCreateModel>(
      `${baseRecipesUrl}${recipeId}${jsonExt}`
    );
  }

  editRecipe(recipeId: string, body: RecipeCreateModel) {
    return this.http.patch(recipesUrl, {
      [recipeId]: body // patch {id: body}
    });
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete(`${baseRecipesUrl}${recipeId}${jsonExt}`);
  }
}
