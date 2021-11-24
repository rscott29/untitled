import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';

// const leaveTrans = transition(':leave', [
//   style({
//     opacity: 1,
//   }),
//   animate(
//     '1s ease-out',
//     style({
//       opacity: 0,
//     }),
//   ),
// ]);
// const enterTransition = transition(':enter', [
//   style({
//     opacity: 0,
//   }),
//   animate(
//     '1s ease-in',
//     style({
//       opacity: 1,
//     }),
//   ),
// ]);

const slideTrans = transition('out <=> in', animate('600ms ease-in-out'));
export const slideIn = trigger('slideInOut', [
  slideTrans,
  state(
    'out',
    style({
      transform: 'translateX(0px)',
      opacity: '0',
      visibility: 'hidden',
    }),
  ),
  state(
    'in',
    style({
      opacity: '1',
      visibility: 'visible',
      left: '320px',
      transform: 'translateX(0)',
    }),
  ),
]);
export const fadeAnimation = trigger('fade', [

  transition(':leave',
    animate(2000, style({opacity: 0})))
]);
