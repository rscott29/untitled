import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { fadeAnimation, slideIn } from '../animations/login.animations';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { isAuthenticated } from '../store/auth/auth.selector';
import { loginStart } from '../store/auth/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideIn, fadeAnimation,
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild(), { optional: true }),
      ]),
    ]),
    trigger('easeInOut', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate('500ms ease-in', style({
          opacity: 1,
        })),
      ]),
      transition('* => void', [
        style({
          opacity: 1,
        }),
        animate('500ms ease-in', style({
          opacity: 0,
        })),
      ]),
    ]),

  ],
})
export class LoginComponent implements OnInit {
  authState: Observable<any> | null;
  loginClicked = false;
  loginRef: ElementRef | undefined;
  loginForm: FormGroup;
  animationState = 'out';
  show: boolean = true;
  @ViewChild('backgroundVid') backgroundVid: ElementRef = new ElementRef<any>('video');
  isLoggedIn = false;
  loginComplete = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<any>,
    private router: Router,
    private renderer: Renderer2,
    private elem: ElementRef) {
    this.loginForm = new FormGroup({});
    this.authState = new Observable<any>();

  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

  }

  login() {

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.loginClicked = !this.loginClicked;
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    const form = (this.loginRef = this.elem.nativeElement.querySelector('.login'));
    this.show = false;

    this.renderer.addClass(form, 'shift_left');
    this.store.dispatch(loginStart({ email, password }));
    this.store.select(isAuthenticated).pipe(filter(value => value !== null)).subscribe(res => {
      this.isLoggedIn = res!.isLoggedIn;

    });
    setTimeout(() => {
      this.renderer.removeClass(form, 'shift_left');

    }, 2000);
    setTimeout(() => {
      this.renderer.removeClass(form, 'flatten_animation');
      this.animationState = 'out';
      this.authState = this.store.select(isAuthenticated).pipe(take(1));

    }, 2000);
    setTimeout(() => {
      this.loginComplete = true;
    }, 3000);

  }

  retry() {
    this.show = !this.show;
    this.authState = null;
    this.loginForm.reset();
  }


}
