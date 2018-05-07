import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import * as fromRecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  initForm(){
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      //const recipe = this.recipeService.getRecipe(this.id);
      this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipeName =  recipe.name;
          recipeImgPath = recipe.imagePath;
          recipeDesc = recipe.description;
          if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]),
              }));
            }
          }
        }); 
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    if(this.editMode){
      this.store.dispatch(new fromRecipeActions.UpdateRecipe({
        index: this.id,
        updatedRecipe: this.recipeForm.value
      }));
      //this.recipeService.updateRecipe(this.id, newRecipe);
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.store.dispatch(new fromRecipeActions.AddRecipe(this.recipeForm.value));
      //this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    }))
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
