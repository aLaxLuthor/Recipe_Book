import { Component, 
  OnInit,
  Output,
  EventEmitter } from '@angular/core';
import {Recipe} from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeItemSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a test', 'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg'),
    new Recipe('Another Test Recipe', 'This is a second test', 'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg')
  ];
  
  constructor() { }
  ngOnInit() {
  }

  onRecipeSelected(selectedRecipe: Recipe){
    this.recipeItemSelected.emit(selectedRecipe);
  }
}
