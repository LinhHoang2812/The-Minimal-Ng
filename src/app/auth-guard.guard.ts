import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './service/auth-service.service';
import { inject } from '@angular/core';
import { ScreenServiceService } from './service/screen-service.service';

export const authGuardGuard: CanActivateChildFn = (state, route) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.user.value?.token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const authGuard: CanActivateFn = (state, route) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  if (authService.user.value) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
export const CheckoutGuard: CanActivateFn = (state, route) => {
  const screen = inject(ScreenServiceService);
  const router = inject(Router);
  if (screen.cartStep === 1) {
    return true;
  } else {
    router.navigateByUrl('/cart');
    return false;
  }
};
export const PaymentGuard: CanActivateFn = (state, route) => {
  const screen = inject(ScreenServiceService);
  const router = inject(Router);

  if (screen.cartStep === 2) {
    return true;
  } else {
    router.navigateByUrl('/cart');
    return false;
  }
};
export const PaymentCompleteGuard: CanActivateFn = (state, route) => {
  const screen = inject(ScreenServiceService);
  const router = inject(Router);

  if (screen.cartStep === 3) {
    return true;
  } else {
    router.navigateByUrl('/cart');
    return false;
  }
};
// return <any>authService.user.subscribe((user) => {
//   if (user) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// });
