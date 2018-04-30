import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  //token: String;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new AuthActions.SignUp());
          firebase.auth().currentUser.getToken().then(
            (token: string) => {
              this.store.dispatch(new AuthActions.SetToken(token))
            }
          )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(      
      response => {
        this.store.dispatch(new AuthActions.SignIn());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken().then(
          (token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token))
          }
        )
      }
    )
    .catch(
      error => console.log("Error: " + error)
    );
  }
  
  logout(){
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.SignOut());
  }
}
