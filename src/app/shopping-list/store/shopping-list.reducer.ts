import * as ShoppingListActions from './shopping-list.actions';
import { Action } from "@ngrx/store";
import { ingredient } from '../../shared/ingredient.model';

export interface State{
    ingredients: ingredient[],
    editedIngredient: ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new ingredient('Apples', 5),
        new ingredient('Tomatoes', 10)       
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, 
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:        
            return {
                ...state, 
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            //Get the ingredient we need to update
            const ingredientToUpd = state.ingredients[state.editedIngredientIndex]
            //Copy the existing ingredient, but update any fields changed in the new ingredient.
            const updatedIngre = {
                ...ingredientToUpd,
                ...action.payload.updIngredient
            }
            //Copy the ingredients array to a variable.
            const oldIngrArr = [...state.ingredients];
            oldIngrArr[state.editedIngredientIndex] = updatedIngre;
            return {
                ...state, 
                ingredients: oldIngrArr,
                editedIngredient:  null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            //Copy the old ingredients array
            const ingredientsToRemoveFrom = [...state.ingredients];
            ingredientsToRemoveFrom.splice(state.editedIngredientIndex, 1);
            return {
                ...state, 
                ingredients: ingredientsToRemoveFrom,
                editedIngredient:  null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default: 
            return state;
    }
}