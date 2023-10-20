import { Component, Input } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = new Recipe('', '', '', []);

  constructor(private recipeService: RecipeService) {}

  onRecipeSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
