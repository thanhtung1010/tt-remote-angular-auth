import { animate, style, transition, trigger } from "@angular/animations";

const invisibleEyeEnterTransition = transition(':enter', [
  style({
    transform: 'translate(-100%, -100%)',
  }),
  animate('.5s ease', style({
    transform: 'translate(0, 0)',
  }))
]);

export const invisibleEyeEnter = trigger('invisibleEyeEnter', [invisibleEyeEnterTransition]);

const invisibleEyeLeaveTransition = transition(':leave', [
  style({
    transform: 'translate(0, 0)',
  }),
  animate('.5s ease', style({
    transform: 'translate(-100%, -100%)',
  }))
]);

export const invisibleEyeLeave = trigger('invisibleEyeLeave', [invisibleEyeLeaveTransition]);

// export const menuFloatInOut = trigger('menuFloatInOut', [
//   state('open', style({
//     transform: 'translate(0, 0)',
//   })),
//   state('close', style({
//     transform: 'translate(-100%, -0)',
//   })),
//   transition('open => close', [animate('1s ease-in')]),
//   transition('close => open', [animate('1s ease-out')]),
// ]);
