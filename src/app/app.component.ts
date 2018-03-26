import { Component, Output, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // loadedTab = 'recipe';
  // onNavigate(tabName: string){
  //   this.loadedTab = tabName;
  // }

  constructor(private shoppingListService: ShoppingListService,
    private route: ActivatedRoute, 
    private router: Router){}

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDHlrr1J7bfScV5o10UWIYLoDhTy1ekYCM",
      authDomain: "ng-recipe-book-43a8a.firebaseapp.com",
    });
  }
}
