import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipe.reducers';
import * as fromRecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipeState: Observable<fromRecipe.State>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
        //this.selectedRecipe = this.recipeService.getRecipe(this.id);        
      }
    );
  }

  onAddToShoppingList(){
    this.store.select('recipes')
      .take(1)
      .subscribe(
        (recipeState: fromRecipe.State) => {
          this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
        }
      );    
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(this.id));
    // this.recipeService.removeRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
