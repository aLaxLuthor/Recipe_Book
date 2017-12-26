import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') newIngredientName: ElementRef;
  @ViewChild('amountInput') newIngredientAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddClick(){
    const ingName = this.newIngredientName.nativeElement.value;
    const ingAmount = this.newIngredientAmount.nativeElement.value;
    this.shoppingListService.addIngredient(new Ingredient(ingName ,ingAmount ));
  }
}
