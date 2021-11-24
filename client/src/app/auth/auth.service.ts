import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../models/User';
import { AppState } from '../store/app.state';
import { AuthResponseData } from '../models/AuthResponseData';
import { autoLogout } from '../store/auth/auth.actions';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  timeoutInterval: any;
  isError: boolean | undefined;

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('https://localhost:3000/login', { email, password });

  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://localhost:3000/signup',
      { email, password, returnSecureToken: true },
    );
  }

  formatUser(data: AuthResponseData) {

    return new User(
      data.user,
      data.authState,
      data.message,
      data.expireDate,
    );
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = new Date(user.expireDate * 1000).getTime()
    const timeInterval = (expirationDate - todaysDate)

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
      console.log('refreshing token...')
    }, timeInterval);

  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user = new User(
        userData.user,
        userData.authState,
        userData.message,
        userData.expireDate,
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {

    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
    return this.http.post('https://localhost:3000/logout', {});
  }

}
