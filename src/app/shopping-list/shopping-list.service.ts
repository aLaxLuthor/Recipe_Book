import { ingredient } from "../Shared/ingredient.model";


export class ShoppingListService{
    ingredients: ingredient[] = [
        new ingredient('apples', 5),
        new ingredient('Tomatoes', 10)
      ];   

    getShoppingListIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(){
        this.ingredients.push();
    }
}