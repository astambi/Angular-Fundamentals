import { Action } from '@ngrx/store';

import { RecipeCreateModel } from '../../recipe/models/recipe-create.model';
import { RecipeListModel } from '../../recipe/models/recipe-list.model';

export const GET_ALL_RECIPES = '[RECIPES] Get All';
export const GET_RECIPE_DETAILS = '[RECIPES] Get Details';
export const GET_RECIPE_TO_EDIT = '[RECIPES] Get Recipe to Edit';

export class GetAllRecipes implements Action {
  type: string = GET_ALL_RECIPES;
  constructor(public payload: RecipeListModel[]) {}
}

export class GetRecipeDetails implements Action {
  type: string = GET_RECIPE_DETAILS;
  constructor(public payload: RecipeCreateModel) {}
}

export class GetRecipeToEdit implements Action {
  type: string = GET_RECIPE_TO_EDIT;
  constructor(public payload: RecipeCreateModel) {}
}

export type Types = GetAllRecipes | GetRecipeDetails | GetRecipeToEdit;
