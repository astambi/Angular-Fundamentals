import { RecipeModule } from './recipe.module';

describe('RecipeModule', () => {
  let recipeModule: RecipeModule;

  beforeEach(() => {
    recipeModule = new RecipeModule();
  });

  it('should create an instance', () => {
    expect(recipeModule).toBeTruthy();
  });
});
