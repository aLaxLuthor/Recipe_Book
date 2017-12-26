import {EventEmitter} from '@angular/core';
import {Recipe} from './recipe.model';
import { Ingredient } from '../shared/ingredient.model'

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'A test recipe', 
            'This is a test', 
            'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
            []
        ),

        new Recipe(
            'Another Test Recipe', 
            'This is a second test', 
            'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
            []
            )
      ];

      getRecipes(){
          //slice with no arguments returns a copy of the array
          return this.recipes.slice();
      }

      
}