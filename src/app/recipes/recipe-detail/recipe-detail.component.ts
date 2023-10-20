import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
