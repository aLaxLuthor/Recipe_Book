import { Component, OnInit, OnDestroy } from '@angular/core';
import { ingredient } from '../Shared/ingredient.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as shoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']  
})
export class ShoppingListComponent implements OnInit {
  newIngredient: ingredient;
  shoppingListState: Observable<{ingredients: ingredient[]}>

  constructor(private store: Store<fromShoppingList.appState>) {          
   }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number){
    this.store.dispatch(new shoppingListActions.StartEdit(index))
  }
}
