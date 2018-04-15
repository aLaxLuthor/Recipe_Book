import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import { ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class RecipeService{    
    addSelectedRecipeIngredientsToShoppingList = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    databaseStr: string = "https://ng-recipe-book-43a8a.firebaseio.com/recipes.json";

    constructor(public slService: ShoppingListService, 
        private httpClient: HttpClient,
        private authService: AuthService){}

    private recipes: Recipe[] = [
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
      ];    

    getRecipes(){
        //slice with no arguments returns a copy of the array
        return this.recipes.slice();
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    removeRecipe(id: number){
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngregientsToShoppingList(ingredients: ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
    }

    //Database Transaction Methods
    saveRecipesToDatabase(){
        const token  = this.authService.getToken();
        // return this.httpClient.put(this.databaseStr, this.recipes, {            
        //     params: new HttpParams().set('auth', token.toString())
        // });
        const req = new HttpRequest('PUT', this.databaseStr, this.recipes, {
            reportProgress: true,
            // params: new HttpParams().set('auth', token.toString())
        });
        return this.httpClient.request(req);
    }

    loadRecipesFromDatabase(){
        const token = this.authService.getToken();

        //return this.httpClient.get<Recipe[]>(this.databaseStr + token).map(
        return this.httpClient.get<Recipe[]>(this.databaseStr, {
            observe: 'body',
            // params: new HttpParams().set('auth', token.toString())
        }).map(
            (recipes) => {
                for(let currRecipe of recipes){
                    if(!currRecipe['ingredients']){
                        currRecipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        ).subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
                this.recipesChanged.next(this.recipes.slice());
            }
        );     
    }
}