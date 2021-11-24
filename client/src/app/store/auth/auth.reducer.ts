import { autoLogout, loginFail, loginSuccess, signupSuccess } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action: any) => {
    return {
      ...state,
      user: action.user,
    };
  }),

  on(loginFail, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  }),
  on(signupSuccess, (state, action: any) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),

);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
