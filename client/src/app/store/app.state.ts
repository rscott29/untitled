
import { SharedState } from './shared/shared.state';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedReducer } from './shared/shared.reducer';


import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AUTH_STATE_NAME } from './auth/auth.selector';
import { AuthReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState | null;
  [AUTH_STATE_NAME]: AuthState | null;
  router: RouterReducerState | null;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer,
};
