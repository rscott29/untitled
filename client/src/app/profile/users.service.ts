import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Datum, User } from './User';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<Datum[]> {
    return this.http.get<User>('https://localhost:3000/users').pipe(
      mergeMap((user: User) => {
        return of(user.data);
      }),
    );
  }
}
