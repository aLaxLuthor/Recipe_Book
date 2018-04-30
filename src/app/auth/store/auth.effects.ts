import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import * as fromAuthActions from './auth.actions';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects{
    constructor(private actions$: Actions, private router: Router){}

    @Effect()
    authSignup = this.actions$
        .ofType(fromAuthActions.TRY_SIGN_UP)
        .map((action: fromAuthActions.TrySignUp) => {            
            return action.payload;
        })
        .switchMap((authData: {userName: string, password: string}) => {
            return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.userName, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            return [{
                type: fromAuthActions.SIGN_UP
            },
            {
                type: fromAuthActions.SET_TOKEN,
                payload: token
            }]}
        );

    @Effect()
    authSignin = this.actions$
        .ofType(fromAuthActions.TRY_SIGN_IN)
        .map((action: fromAuthActions.TrySignIn) => {            
            return action.payload;
        })
        .switchMap((authData: {userName: string, password: string}) => {
            return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.userName, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [{
                type: fromAuthActions.SIGN_IN
            },
            {
                type: fromAuthActions.SET_TOKEN,
                payload: token
            }]}
        );
}