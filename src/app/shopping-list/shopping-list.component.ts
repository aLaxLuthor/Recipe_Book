import { Component, OnInit } from '@angular/core';
import { ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
  newIngredient: ingredient;
  ingredients: ingredient[];// = [
  //   new ingredient('apples', 5),
  //   new ingredient('Tomatoes', 10)
  // ];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingListIngredients();
  }
}
