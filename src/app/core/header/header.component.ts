import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
    authState: Observable<fromAuth.State>;

    constructor(private recipeService: RecipeService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>){}    


    ngOnInit(){
        this.authState = this.store.select('auth');
    }

    onSaveData(){
        this.recipeService.saveRecipesToDatabase().subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );       
    }

    onLoadData(){
        this.recipeService.loadRecipesFromDatabase();
    }

    onLogout(){
        this.authService.logout();
    }

    // isAuthenticated() {                
    //  return this.authService.isAuthenticated();
    // }
}