import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm') shoppingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: ingredient;

  constructor(private store: Store<fromShoppingList.appState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if(data.editedIngredientIndex > -1){
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }else{
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){ 
    const formValue = form.value;
    const newIngredient = new ingredient(formValue.name, formValue.amount );
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient( {updIngredient: newIngredient} ));
    }
    else{      
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }    
    this.ClearForm();
   }

   ClearForm(){
     this.editMode = false;
     this.shoppingForm.reset();
   }

   onDelete(){
     if(this.editMode){
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
     }
     this.ClearForm();
   }
}
