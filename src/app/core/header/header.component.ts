import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromRecipeActions from '../../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
    authState: Observable<fromAuth.State>;

    constructor(private store: Store<fromApp.AppState>){}    


    ngOnInit(){
        this.authState = this.store.select('auth');
    }

    onSaveData(){
        this.store.dispatch(new fromRecipeActions.StoreRecipes());
    }

    onLoadData(){
        this.store.dispatch(new fromRecipeActions.FetchRecipes());
    }

    onLogout(){
        this.store.dispatch(new AuthActions.SignOut());
    }
}