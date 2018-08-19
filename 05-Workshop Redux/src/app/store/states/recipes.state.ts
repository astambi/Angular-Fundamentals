import { RecipeCreateModel } from '../../recipe/models/recipe-create.model';
import { RecipeListModel } from '../../recipe/models/recipe-list.model';

export interface RecipesState {
  all: RecipeListModel[];
  details: RecipeCreateModel;
  toEdit: RecipeCreateModel;
}
