import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { ingredient } from '../Shared/ingredient.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']  
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
