import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']  
})
export class ShoppingListComponent implements OnInit {
  newIngredient: Ingredient;
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) {
    this.slService.ingredientChanged.subscribe(
      (newIngredients: Ingredient[]) => {
        this.ingredients = newIngredients;
      }
    );
   }

  ngOnInit() {
    this.ingredients = this.slService.getShoppingListIngredients();
  }


}
