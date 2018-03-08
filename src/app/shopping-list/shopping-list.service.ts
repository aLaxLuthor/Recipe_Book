import { ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs/Subject';


export class ShoppingListService{
    ingredientsChanged = new Subject<ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: ingredient[] = [
        new ingredient('Apples', 5),
        new ingredient('Tomatoes', 10)
      ];   

    getShoppingListIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: ingredient){
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(newIngredients: ingredient[]){
        this.ingredients.push(...newIngredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}