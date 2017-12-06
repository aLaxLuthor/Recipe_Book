import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ingredient } from '../../Shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<ingredient>();
  @ViewChild('nameInput') newIngredientName: ElementRef;
  @ViewChild('amountInput') newIngredientAmount: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAddClick(){
    this.ingredientAdded.emit(new ingredient(this.newIngredientName.nativeElement.value, this.newIngredientAmount.nativeElement.value));
  }
}
