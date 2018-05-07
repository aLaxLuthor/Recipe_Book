import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from '../recipe.model';
import * as fromRecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects{
    databaseStr: string = "https://ng-recipe-book-43a8a.firebaseio.com/recipes.json";

    @Effect()
    recipeFetch = this.action$
        .ofType(fromRecipeActions.FETCH_RECIPES)
        .switchMap((action: fromRecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>(this.databaseStr, {
                observe: 'body',
                responseType: 'json'
            })})
        .map((recipes) => {
            for(let currRecipe of recipes){
                if(!currRecipe['ingredients']){
                    currRecipe['ingredients'] = [];
                }
            }            
            return {
                type: fromRecipeActions.SET_RECIPES,
                payload: recipes
            };
        });

    @Effect({dispatch: false})
    recipeStore = this.action$
        .ofType(fromRecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            const req = new HttpRequest('PUT', this.databaseStr, state.recipes, {
                reportProgress: true,
            });
            return this.httpClient.request(req);
        });

    constructor(private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>){}
}