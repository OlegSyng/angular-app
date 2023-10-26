import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

export const recipeResolver: ResolveFn<Recipe[]> = (route, state) => {
  const recipes = inject(RecipeService).getRecipes();
  if (recipes.length > 0) {
    return recipes;
  }
  return inject(DataStorageService).fetchRecipes();
};
