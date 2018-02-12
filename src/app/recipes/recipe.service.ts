import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import { ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    addSelectedRecipeIngredientsToShoppingList = new EventEmitter<Recipe>();

    constructor(public slService: ShoppingListService){

    }

    private recipes: Recipe[] = [
        new Recipe(
            'Apple Pie', 
            'This is an apple pie recipe', 
            'http://img.delicious.com.au/P8DdWS4d/h506-w759-cfill/del/2015/10/apple-pie-11284-1.jpg',
            [
                new ingredient('butter', 30), 
                new ingredient('Granny Smith Apples', 1), 
                new ingredient('egg', 1)
            ]),

        new Recipe(
            'Chicken Dish', 
            'This is a second test', 
            'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
            [
                new ingredient('Chicken', 1),
                new ingredient('sauce', 1)
            ])
      ];

      getRecipes(){
          //slice with no arguments returns a copy of the array
          return this.recipes.slice();
      }

      getRecipe(id: number){
          return this.recipes[id];
      }

      addIngregientsToShoppingList(ingredients: ingredient[]){
          this.slService.addIngredients(ingredients);
      }
}