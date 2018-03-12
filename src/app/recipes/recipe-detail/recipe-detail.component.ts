import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.id);        
      }
    );
  }

  onAddToShoppingList(){
    //this.recipeService.addSelectedRecipeIngredientsToShoppingList.emit(this.selectedRecipe);
    this.recipeService.addIngregientsToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
