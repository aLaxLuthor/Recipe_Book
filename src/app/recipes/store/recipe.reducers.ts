import { Recipe } from '../recipe.model';
import { ingredient } from '../../shared/ingredient.model'
import * as fromApp from '../../store/app.reducers';
import * as fromRecipeActions from './recipe.actions';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State{
    recipes: Recipe[];
}

const initialState: State= {
    recipes: [
        new Recipe(
            'Apple Pie', 
            'This is an apple pie recipe', 
            'http://img.delicious.com.au/P8DdWS4d/h506-w759-cfill/del/2015/10/apple-pie-11284-1.jpg',
            [
                new ingredient('butter', 30), 
                new ingredient('Granny Smith Apples', 1), 
                new ingredient('egg', 1)
            ]),

        new Recipe(
            'Chicken Dish', 
            'This is a second test', 
            'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
            [
                new ingredient('Chicken', 1),
                new ingredient('sauce', 1)
            ])
      ]
};

export function RecipeReducer(state = initialState, action: fromRecipeActions.RecipeActions) {
    switch(action.type){
        case(fromRecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case(fromRecipeActions.UPDATE_RECIPE):
            const recipeToUpdate = state.recipes[action.payload.index];
            const updatedRecipes = {
                ...recipeToUpdate,
                ...action.payload.updatedRecipe
            };
            const recipesToReturn = [...state.recipes];
            recipesToReturn[action.payload.index] = action.payload.updatedRecipe;
            return {                
                ...state,
                recipes: recipesToReturn
            };
        case(fromRecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case(fromRecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default: 
            return state;
    }
}