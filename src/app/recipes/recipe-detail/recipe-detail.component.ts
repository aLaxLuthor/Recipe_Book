import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromShoppingList.appState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.id);        
      }
    );
  }

  onAddToShoppingList(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.selectedRecipe.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
