import { Component, OnInit, OnDestroy } from '@angular/core';
import { ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']  
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  newIngredient: ingredient;
  ingredients: ingredient[];

  constructor(private slService: ShoppingListService) {    
   }

  ngOnInit() {
    this.ingredients = this.slService.getShoppingListIngredients();

    this.subscription = this.slService.ingredientsChanged.subscribe(
      (newIngredients: ingredient[]) => {
        this.ingredients = newIngredients;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
