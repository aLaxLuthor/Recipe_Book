import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AppComponent } from "./app.component";
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';

const appRoutes: Routes = [
    { path: '', component: RecipeListComponent},
    { path: 'recipes', component: RecipesComponent, children:[
        {path: ':name', component: RecipeDetailComponent}
    ]},
    {path: 'shoppingList', component: ShoppingListComponent},
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}