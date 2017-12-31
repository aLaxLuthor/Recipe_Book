import { Component, OnInit } from '@angular/core';
import { ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']  
})
export class ShoppingListComponent implements OnInit {
  newIngredient: ingredient;
  ingredients: ingredient[];

  constructor(private slService: ShoppingListService) {
    this.slService.ingredientChanged.subscribe(
      (newIngredients: ingredient[]) => {
        this.ingredients = newIngredients;
      }
    );
   }

  ngOnInit() {
    this.ingredients = this.slService.getShoppingListIngredients();
  }


}
