import { ingredient } from '../shared/ingredient.model'
import { EventEmitter } from "@angular/core";


export class ShoppingListService{
    ingredientChanged = new EventEmitter<ingredient[]>();

    private ingredients: ingredient[] = [
        new ingredient('Apples', 5),
        new ingredient('Tomatoes', 10)
      ];   

    getShoppingListIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: ingredient){
        this.ingredients.push(newIngredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    addIngredients(newIngredients: ingredient[]){
        this.ingredients.push(...newIngredients);
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}