import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm') shoppingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(){
    const formValue = this.shoppingForm.value;
    const newIngredient = new ingredient(formValue.name, formValue.amount );
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else{      
      this.shoppingListService.addIngredient(newIngredient);
    }    
    this.ClearForm();
   }

   ClearForm(){
     this.editMode = false;
     this.shoppingForm.reset();
   }

   onDelete(){
     if(this.editMode){
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
     }
     this.ClearForm();
   }
}
