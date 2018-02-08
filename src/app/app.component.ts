import { Component, Output } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // loadedTab = 'recipe';
  // onNavigate(tabName: string){
  //   this.loadedTab = tabName;
  // }

  constructor(private shoppingListService: ShoppingListService,
    private route: ActivatedRoute, 
    private router: Router){}
}
