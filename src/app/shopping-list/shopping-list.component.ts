import { Component, OnInit } from '@angular/core';
import { ingredient } from '../Shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  newIngredient: ingredient;
  ingredients: ingredient[] = [
    new ingredient('apples', 5),
    new ingredient('Tomatoes', 10)
  ];

  constructor() { }

  ngOnInit() {
  }
  
  AddIngredient(newIngredient: ingredient){
    this.ingredients.push(newIngredient);
  }
}
