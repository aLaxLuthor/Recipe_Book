import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private route: ActivatedRoute, private router: Router,
        private recipeService: RecipeService){}

    onSaveData(){
        this.recipeService.saveRecipesToDatabase().subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );       
    }

    onLoadData(){
        this.recipeService.loadRecipesFromDatabase();
    }
}