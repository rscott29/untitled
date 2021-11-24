import { catchError, delay, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { autoLogin, autoLogout, loginFail, loginStart, loginSuccess, signupStart, signupSuccess } from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AppState } from '../app.state';
import { setErrorMessage, setLoadingSpinner } from '../shared/shared.actions';
import { User } from '../../models/User';


@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      switchMap((action) => {
        return this.authService.login(action.email, action.password).pipe(

          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
         //   this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);

            return loginSuccess({ user, redirect:true, success:true });
          }),

          catchError((errResp) => {
            const  user = new User(
              '',
              false,
              errResp.error.message,
             0


            )
            this.store.dispatch(loginFail({user} ))
            return of(setErrorMessage({ message: errResp.error.message }));
          }),
        );
      }),
    );
  });
  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          //   this.store.dispatch(loginFailure({ errorMessage: true }));
          if (action.redirect) {
            setTimeout( () => {
              this.router.navigate(['home']);
            },6000)

          }
        }),
      );
    },
    { dispatch: false },
  );
  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          catchError((errResp) => {
            const errorMessage = errResp.error.message;
            this.store.dispatch(setErrorMessage({message: errorMessage}));
            return of([]);
          }),
          map((data:any) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({ user, redirect: true });
          }),
        );
      }),
    );
  });
  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false, success: true }));
      }),
    );
  });
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth/login']);
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) {

  }


}
