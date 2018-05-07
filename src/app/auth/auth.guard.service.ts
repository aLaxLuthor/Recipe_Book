import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducer';
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private store: Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select('auth')
            .take(1)    //if using rxjs6 and not using rxjs-compat, this should be: pipe(take(1))
                        //import take from 'rxjs/add/operator/take'
            .map((authState: fromAuth.State) => {
            return authState.authenticated;
            });
    }
}