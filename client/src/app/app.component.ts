import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Router, RouterOutlet } from '@angular/router';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { isAuthenticated } from './store/auth/auth.selector';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  @ViewChild(LoginComponent) login: { isLoggedIn: boolean; } | undefined;
  private isLoggedIn: boolean  | undefined;


  constructor(private router: Router, store: Store) {

    store.select(isAuthenticated).subscribe(res => {
  //    this.isLoggedIn = res?.isLoggedIn
    })

    if(!this.isLoggedIn){
      this.router.navigate(['/auth/login'])
    }
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
