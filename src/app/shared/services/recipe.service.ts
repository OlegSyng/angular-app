import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://plus.unsplash.com/premium_photo-1668618296700-bfaa48f52cd5?auto=format&fit=crop&q=80&w=1926&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1998&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   ),
  //   new Recipe(
  //     'Italian Pizza',
  //     'Cheesy pizza with a crispy crust and fresh toppings.',
  //     'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     [
  //       new Ingredient('Dough', 1),
  //       new Ingredient('Tomato Sauce', 0.5),
  //       new Ingredient('Cheese', 2),
  //       new Ingredient('Pepperoni', 4),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); // emit a copy of the array
  }

  getRecipes() {
    // return a copy of the array
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // return a copy of the array
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice()); // emit a copy of the array
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    // replace the recipe at index with newRecipe
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice()); // emit a copy of the array
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice()); // emit a copy of the array
  }
}
