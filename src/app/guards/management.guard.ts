import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ROUTE, DeviceIdService, FirebaseService } from "tt-library-angular-porfolio";
import { Observable } from "rxjs";

export const managementActiveGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  // const firebaseService = inject(FirebaseService);
  // if ()
  // if (!firebaseService.auth) {
  //   firebaseService.initAuth();
  // }

  // firebaseService.auth?.authStateReady().then()
  return true;
};
