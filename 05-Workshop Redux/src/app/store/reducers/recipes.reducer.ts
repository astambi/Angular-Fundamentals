import { RecipesState } from '../states/recipes.state';
import * as RecipesActions from '../actions/recipes.actions';

const initialState: RecipesState = {
  all: [],
  details: null,
  toEdit: null
};

function getAllRecipes(state, allRecipes) {
  return Object.assign({}, state, {
    all: allRecipes
  });

  //   return {
  //     ...state,
  //     all: allRecipes
  //   };
}

function getRecipeDetails(state, recipeDetails) {
  return Object.assign({}, state, {
    details: recipeDetails
  });
}

function getRecipeToEdit(state, recipeToEdit) {
  return Object.assign({}, state, {
    toEdit: recipeToEdit
  });
}

export function recipesReducer(
  state: RecipesState = initialState,
  action: RecipesActions.Types
) {
  switch (action.type) {
    case RecipesActions.GET_ALL_RECIPES:
      return getAllRecipes(state, action.payload);
    case RecipesActions.GET_RECIPE_DETAILS:
      return getRecipeDetails(state, action.payload);
    case RecipesActions.GET_RECIPE_TO_EDIT:
      return getRecipeToEdit(state, action.payload);
    default:
      return state;
  }
}
