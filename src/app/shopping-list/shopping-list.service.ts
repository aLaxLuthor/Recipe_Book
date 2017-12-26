import { Ingredient } from "../Shared/ingredient.model";
import { EventEmitter } from "@angular/core";


export class ShoppingListService{
    ingredientChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];   

    getShoppingListIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: Ingredient){
        this.ingredients.push(newIngredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}